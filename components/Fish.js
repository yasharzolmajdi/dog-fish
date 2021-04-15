import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

export const QUERY = gql`
  query MyQuery($id: ID!) {
    getAnimal(id: $id) {
      ... on Fish {
        sound
        eat
        depth
        id
      }
    }
  }
`;

export default function Fish() {
  const router = useRouter();
  const { animal } = router.query;

  const { data, loading } = useQuery(QUERY, { variables: { id: animal } });

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    getAnimal: { depth, sound, eat },
  } = data;

  return (
    <ul>
      <li>depth: {depth}</li>
      <li>sound: {sound}</li>
      <li>eat: {eat}</li>
    </ul>
  );
}
