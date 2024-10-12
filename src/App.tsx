import { Toaster } from "sonner";
import Nav from "./components/nav/Nav";
import Routing from "./routing/Routing";

function App() {
  return (
    <>
      <Nav />
      <Routing />
      <Toaster richColors position="bottom-center" />
    </>
  );
}

export default App;
