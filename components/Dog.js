import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

export const QUERY = gql`
  query MyQuery($id: ID!) {
    getAnimal(id: $id) {
      ... on Dog {
        id
        legs
        sound
        eat
      }
    }
  }
`;

export default function Dog() {
  const router = useRouter();
  const { animal } = router.query;

  const { data, loading } = useQuery(QUERY, { variables: { id: animal } });

  if (loading) {
    return <div>Loading...</div>;
  }

  const {
    getAnimal: { legs, sound, eat },
  } = data;

  return (
    <ul>
      <li>legs: {legs}</li>
      <li>sound: {sound}</li>
      <li>eat: {eat}</li>
    </ul>
  );
}
