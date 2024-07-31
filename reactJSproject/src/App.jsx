import './App.css'
import Main1 from './components/main1'
import { PostDataProvider } from './components/contextAPI';


function App() {


  return (
    <>
      <div className="lable"><pre>work    in    progress</pre> <span className="loader"></span>  </div>
      <PostDataProvider><Main1 /></PostDataProvider>
    </>
  )
}

export default App;
