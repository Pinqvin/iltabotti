import got from "got";
import * as D from "io-ts/Decoder";
import { pipe } from "fp-ts/function";
import { fold } from "fp-ts/Either";

import { config } from "../config";

interface IltalehtiComment {
  title: string;
  username: string;
  comment: string;
}

const CommentResult = D.type({
  data: D.type({
    asset: D.type({
      title: D.nullable(D.string),
      url: D.string,
      totalCommentCount: D.number,
      comments: D.type({
        nodes: D.array(
          D.type({
            body: D.string,
            user: D.type({
              username: D.string,
            }),
          })
        ),
      }),
    }),
  }),
});

type CommentResult = D.TypeOf<typeof CommentResult>;

const ILTALEHTI_COMMENTS_QUERY = `
  query Comments($assetId: ID, $assetUrl: String, $excludeIgnored: Boolean, $sortBy: SORT_COMMENTS_BY!, $sortOrder: SORT_ORDER!) {
    asset(id: $assetId, url: $assetUrl) {
      title
      url
      totalCommentCount
      comments(query: {limit: 1, excludeIgnored: $excludeIgnored, sortOrder: $sortOrder, sortBy: $sortBy}) {
        nodes {
          body
          user {
            username
          }
        }
      }
    }
  } 
`;

export async function getTopComments(
  urls: string[]
): Promise<IltalehtiComment[]> {
  const comments: IltalehtiComment[] = [];

  for (const url of urls) {
    const body = await got
      .post(`${config.ILTALEHTI_COMMENTS_GRAPHQL_API}/v1/graph/ql`, {
        json: {
          query: ILTALEHTI_COMMENTS_QUERY,
          variables: {
            assetId: "",
            assetUrl: url,
            excludeIgnored: false,
            sortBy: "LIKES",
            sortOrder: "DESC",
          },
        },
      })
      .json<CommentResult>();

    pipe(
      CommentResult.decode(body),
      fold(
        (errors) => {
          throw new Error(
            `Failed parsing API result: ${JSON.stringify(errors)}`
          );
        },
        (result) => {
          if (result.data.asset.totalCommentCount > 0) {
            comments.push({
              title: result.data.asset.title ?? "",
              username: result.data.asset.comments.nodes[0].user.username,
              comment: result.data.asset.comments.nodes[0].body,
            });
          }
        }
      )
    );
  }

  return comments;
}
