import "./styles.css";

import Compare from "./Compare";
import { Suspense } from "react";

export default function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Compare />
    </Suspense>
  );
}
