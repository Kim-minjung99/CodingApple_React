import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';

function App() {

  let [itemTitle, setItemTitle] = useState(["남자 옷", "남자 바지","화장품"]);
  var [likes, setLikes] = useState([0,0,0]);
  var [isOpenModal, setOpenModal] = useState(false);

  function toggleModal(){
    setOpenModal(!isOpenModal);
  }

  function sortItems(itemTitle : string[]){
    const itemTitleCopy = [...itemTitle];
    setItemTitle(itemTitleCopy.sort());
  }

  function countUpLikes(likes: number[], index: number){
    const copyLikes = [...likes];
    copyLikes[index] = copyLikes[index]+1;
    setLikes(copyLikes);
  }

  

  return (
    <div className="App">
      {
        isOpenModal ===  true ?
        <Modal></Modal> :
        null
      }
      <div className='black-nav'>
        <div>개발 blog</div>
      </div>
      <button onClick={()=>{
        const itemTitleCopy = [...itemTitle];
        itemTitleCopy[0] = "여자 옷";
        setItemTitle(itemTitleCopy);
      }}> 여자옷으로 변경하기 </button>
      <button onClick={()=>{sortItems(itemTitle)}}>정렬하기</button>
      {
        itemTitle.map((titleElement, index)=>{
          return(
            <div className='list'>
              <h4><span onClick={toggleModal}>{titleElement}</span>
                <div>2월 17일 발행</div>
                <button onClick={()=>{countUpLikes(likes, index)}}>♥</button>
              </h4>
              <span>{likes[index]}</span>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
