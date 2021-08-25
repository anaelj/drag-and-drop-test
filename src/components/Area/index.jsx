import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Teste, Footer, Main, MainArea, LeftArea } from "./styles";
import { useRef } from "react";
import Item from "./../Item/index";
import AreaContext from "./context";
import Upload from "../Upload";
import html2canvas from "html2canvas";
import JSZip from "jszip";
// import FileList from "./../FileList/index";
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from "../../services/api";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

function Area() {
  const data = [
    {
      id: 1,
      top: "40px",
      left: "40px",
      cor: "red",
      texto: "Texto padrão",
    },
  ];
  const ref = useRef();
  const [elementsPosition, setElementsPosition] = useState(data);
  const [textoAdd, setTextoAdd] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function move(moved) {
    const temp = elementsPosition.filter((item) => item.id !== moved.id);
    temp.push(moved);
    setElementsPosition(temp);
  }

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedOffset = monitor.getClientOffset(); // posição do item durente a movimentação
      move({
        id: item.id,
        top: draggedOffset.y + "px",
        left: draggedOffset.x + "px",
        cor: item.cor,
        texto: item.texto,
        children: item.children,
      });
    },
  });

  dropRef(ref);

  const handleKeyDown = (event) => {
    console.log(event.keyCode);
    // if (event.keyCode === 13) {
    // }
  };

  const handleUpload = (files) => {
    const temp = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      process: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    setUploadedFiles(uploadedFiles.concat(temp));

    uploadedFiles.forEach(processUpload);
  };

  const updateFile = (id, data) => {
    setUploadedFiles(
      uploadedFiles.map((item) => {
        return id === item.id ? { ...item, ...data } : item;
      })
    );
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);
    data.append("key", updateFile.id);

    api
      .post("posts", data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        console.log("aa", response);
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch((error) => {
        updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  useEffect(() => {
    // console.log(uploadedFiles[0]?.preview);
    if (uploadedFiles.length > 1) {
      setElementsPosition([
        ...elementsPosition,
        {
          id: Math.floor(Math.random() * 1000),
          top: "10px",
          left: "10px",
          children: (
            <img
              src={uploadedFiles[uploadedFiles.length - 1].preview}
              alt="img"
            />
          ),
        },
      ]);
    }
  }, [uploadedFiles]);

  const handleTeste = () => {
    // downloadHandler();

    html2canvas(document.querySelector("#capture")).then((canvas) => {
      //document.body.appendChild(canvas);
      // saveAss(canvas.toDataURL('image/jpeg', 1.0), 'file-name.png');

      //      console.log('test');

      const imgData = canvas.toDataURL("image/jpg", 1.0);

      var zip = new JSZip();

      zip.file(
        "teste.jpg",
        imgData.replace(/^data:image\/(png|jpg);base64,/, ""),
        { base64: true }
      );

      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "example2.zip");
      });
      // zip.file("Hello.txt", "Hello World\n");

      // var img = zip.folder("images");
      // img.file("smile.gif", imgData, {base64: true});

      // zip.generateAsync({type:"base64"}).then(function(base64) {
      //     // see FileSaver.js
      //     // saveAs(base64, "example.zip");
      // });
    });
  };

  const downloadHandler = () => {
    domtoimage
      .toBlob(document.getElementById("capture"), { width: 1080, height: 1080 })
      .then(function (blob) {
        saveAs(blob, "myImage.png");
      });

    let images = [];
    domtoimage
      .toBlob(document.getElementById("capture"))
      .then(function (blob) {
        images.push(blob);
      })
      .then(function () {
        let zip = new JSZip();
        zip.file("myImage.png", images[0], { binary: true });
        zip.generateAsync({ type: "blob" }).then(function callback(blob) {
          saveAs(blob, "myImage.zip");
        });
      });
  };

  function saveAss(uri, filename) {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }
  return (
    <AreaContext.Provider value={{ elementsPosition, move }}>
      <header className="App-header">
        <h1>Testes Cegonha</h1>
        <div>
          <button
            onClick={() =>
              setElementsPosition([
                ...elementsPosition,
                {
                  id: Math.floor(Math.random() * 1000),
                  top: "10px",
                  left: "10px",
                  cor: "red",
                  texto: textoAdd,
                },
              ])
            }
          >
            Adicionar Texto
          </button>
          <input
            type="text"
            name="texto"
            id="idTexto"
            value={textoAdd}
            onChange={(e) => setTextoAdd(e.target.value)}
          />
          {/* <button onClick={() => (elementsPosition[1].top = "400px")}>
            Adicionar Logo
          </button> */}
          <button onClick={handleTeste}>Capture</button>
        </div>
      </header>
      <Main onKeyDown={(e) => handleKeyDown(e)}>
        <LeftArea>
          <Upload onUpload={handleUpload} />
        </LeftArea>
        <MainArea
          ref={ref}
          id="capture"
          src={!!uploadedFiles.length && uploadedFiles[0].preview}
        >
          {elementsPosition.map((item, idx) => (
            <Item key={item.id} data={item} index={idx}>
              {item?.children};
            </Item>
          ))}
        </MainArea>
      </Main>
      <Footer>
        <div></div>
        <div className="filelist">
          {/* <Upload onUpload={handleUpload} /> */}
          {/* {!!uploadedFiles.length && <FileList files={uploadedFiles} />} */}
        </div>
        <div></div>
      </Footer>
    </AreaContext.Provider>
  );
}

export default Area;
