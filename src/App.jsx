import "./App.css";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Area from './components/Area/index';

function App() {


  return (
    <DndProvider backend={HTML5Backend}>
      <Area/>
    </DndProvider>
  );
}

export default App;
