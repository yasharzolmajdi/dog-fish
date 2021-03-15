import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

export const QUERY = gql`
  query MyQuery($id: ID) {
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

  const {
    data: {
      getAnimal: { legs, sound, eat },
    },
  } = useQuery(QUERY, { variables: { id: animal } });

  return (
    <ul>
      <li>legs: {legs}</li>
      <li>sound: {sound}</li>
      <li>eat: {eat}</li>
    </ul>
  );
}
