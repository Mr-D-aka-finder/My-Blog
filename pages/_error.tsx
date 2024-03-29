import { NextPage, NextPageContext } from "next";
import Error from "next/error";

type Props = {
  statusCode?: number;
};

//コードの答え全てはweb上に載っている。理解することは容易。
const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  return statusCode ? (
    /* エラーが発生した場合、エラーを返す */
    <Error statusCode={statusCode}></Error>
  ) : (
    <p>クライアント上でエラーが発生しました</p>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
