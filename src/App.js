import "./App.css";

import Layout from "./components/Layout/Layout";
import useScript from "./components/Script/useScript";

function App() {
 

  return <Layout> 
    {
       useScript('//js.hs-scripts.com/48170833.js', 'body', true, 'hs-script-loader')
    }
    </Layout>;
}

export default App;
