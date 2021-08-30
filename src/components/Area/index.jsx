import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Footer, Main, MainArea, LeftArea } from "./styles";
import { useRef } from "react";
import Item from "./../Item/index";
import AreaContext from "./context";
import Upload from "../Upload";
import html2canvas from "html2canvas";
import JSZip from "jszip";
// import FileList from "./../FileList/index";
import { uniqueId } from "lodash";
import filesize from "filesize";

// import api from "../../services/api";
// import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import TextList from "../TextList";

function Area() {
  const defaultItem = {
    id: uniqueId(),
    top: "40px",
    left: "40px",
    color: "red",
    texto: "Texto padrão",
    backgroundColor: "none",
    fontSize: '16px',
    fontFamily: 'Arial',
    backGroundImage: false
  };

  const data = [defaultItem];
  const ref = useRef();
  const [elementsPosition, setElementsPosition] = useState(data);
  const [selectedItem, setSelectedItem] = useState(elementsPosition[0]);
  const [textoAdd, setTextoAdd] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedOffset = monitor.getClientOffset(); // posição do item durente a movimentação
      const itemMoving = {
        ...item,
        top: draggedOffset.y + "px",
        left: draggedOffset.x + "px"
      };
      setSelectedItem(itemMoving);
    },
  });

  dropRef(ref);

  // const handleKeyDown = (event) => {
  //   console.log(event.keyCode);
  //   // if (event.keyCode === 13) {
  //   // }
  // };

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
      backgroundColor: "none",
    }));
    setUploadedFiles(uploadedFiles.concat(temp));

    // uploadedFiles.forEach(processUpload);
  };

  // const updateFile = (id, data) => {
  //   setUploadedFiles(
  //     uploadedFiles.map((item) => {
  //       return id === item.id ? { ...item, ...data } : item;
  //     })
  //   );
  // };

  // const processUpload = (uploadedFile) => {
  //   const data = new FormData();

  //   data.append("file", uploadedFile.file, uploadedFile.name);
  //   data.append("key", updateFile.id);

  //   api
  //     .post("posts", data, {
  //       onUploadProgress: (e) => {
  //         const progress = parseInt(Math.round((e.loaded * 100) / e.total));
  //         updateFile(uploadedFile.id, {
  //           progress,
  //         });
  //       },
  //     })
  //     .then((response) => {
  //       console.log("aa", response);
  //       updateFile(uploadedFile.id, {
  //         uploaded: true,
  //         id: response.data._id,
  //         url: response.data.url,
  //       });
  //     })
  //     .catch((error) => {
  //       updateFile(uploadedFile.id, {
  //         error: true,
  //       });
  //     });
  // };

  useEffect(() => {
    // console.log(uploadedFiles[0]?.preview);

      uploadedFiles.forEach((element) => {
        const exists = elementsPosition.find((item) => item.id === element.id);

        if (!exists) {
          const newItem = {
            ...defaultItem,
            texto : element.name,
            children: (
              <img
                src={element.preview}
                alt="img"
              />
            ),
          };
          // console.log(newItem);
          setElementsPosition([...elementsPosition, newItem]);
          setSelectedItem(newItem);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  const handleDownloadImage = () => {
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

  // const downloadHandler = () => {
  //   domtoimage
  //     .toBlob(document.getElementById("capture"), { width: 1080, height: 1080 })
  //     .then(function (blob) {
  //       saveAs(blob, "myImage.png");
  //     });

  //   let images = [];
  //   domtoimage
  //     .toBlob(document.getElementById("capture"))
  //     .then(function (blob) {
  //       images.push(blob);
  //     })
  //     .then(function () {
  //       let zip = new JSZip();
  //       zip.file("myImage.png", images[0], { binary: true });
  //       zip.generateAsync({ type: "blob" }).then(function callback(blob) {
  //         saveAs(blob, "myImage.zip");
  //       });
  //     });
  // };

  useEffect(() => {
    // console.log(selectedItem);

    setElementsPosition(
      elementsPosition.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      )
    );
    // console.log(elementsPosition.find(item => item.backGroundImage === true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  // useEffect(() => {
  //   console.log(elementsPosition);
  // }, [elementsPosition]);

  return (
    <AreaContext.Provider
      value={{
        elementsPosition,
        setElementsPosition,
        selectedItem,
        setSelectedItem,
      }}
    >
      <header className="App-header">
        <h1>Testes Cegonha</h1>
        <div>
          <button
            onClick={() =>
              setElementsPosition([
                ...elementsPosition,
                { ...defaultItem, texto: textoAdd },
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
          <button onClick={handleDownloadImage}>Capture</button>
        </div>
      </header>
      <Main>
        <LeftArea>
          <div>
            <Upload onUpload={handleUpload} />
            <TextList textItens={elementsPosition} />
            {/* {!!uploadedFiles.length && <FileList files={uploadedFiles} />} */}
          </div>
        </LeftArea>
        <MainArea
          ref={ref}
          id="capture"
          src={elementsPosition.find(item => item.backGroundImage === true)?.children?.props?.src}
        >
          {elementsPosition.map((item) => (
            !item.backGroundImage &&
            <Item key={item.id} data={item}>
              {item?.children};
            </Item>
          ))}
        </MainArea>
      </Main>
      <Footer>
        <ul>
          {elementsPosition.map((item) => (
            <li
              key={item.id}
            >{`Item: ${item.texto} - posicao: (${item.top},${item.left}) - color: ${item.color} - background: ${item.backgroundColor} - fontSize: ${item.fontSize} - fontFamily: ${item.fontFamily}`}</li>
          ))}
        </ul>
      </Footer>
    </AreaContext.Provider>
  );
}

export default Area;
