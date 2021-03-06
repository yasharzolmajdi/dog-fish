import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";

import { initializeApollo } from "../lib/apolloClient";

const GET_ANIMAL_TYPE_QUERY = gql`
  query MyQuery($id: ID!) {
    getAnimal(id: $id) {
      __typename
    }
  }
`;

function Animal() {
  const router = useRouter();
  const { animal } = router.query;

  const { data, loading } = useQuery(GET_ANIMAL_TYPE_QUERY, {
    variables: { id: animal },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const Page = dynamic(() =>
    import(`../components/${data.getAnimal.__typename}`)
  );

  return <Page />;
}

export default Animal;

// export async function getServerSideProps({ params }) {
//   const id = params.animal;

//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query({
//     query: GET_ANIMAL_TYPE_QUERY,
//     variables: {
//       id,
//     },
//   });

//   const Type = data.getAnimal.__typename;

//   const module = await import(`../components/${Type}`);

//   await apolloClient.query({
//     query: module.QUERY,
//     variables: {
//       id,
//     },
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }
