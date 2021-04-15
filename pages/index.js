import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

import { initializeApollo } from "../lib/apolloClient";

const ALL_ANIMAL_TYPES_QUERY = gql`
  query MyQuery {
    queryAnimal {
      __typename
      id
    }
  }
`;

export default function Home() {
  const { data, loading } = useQuery(ALL_ANIMAL_TYPES_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.queryAnimal.map((animal) => (
        <li>
          <Link href={`/${animal.id}`}>
            <a>
              {animal.__typename}: {animal.id}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: ALL_ANIMAL_TYPES_QUERY,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }
