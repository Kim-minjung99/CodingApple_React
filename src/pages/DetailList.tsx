import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useParams } from 'react-router-dom';
import { Context } from "../App";

type photoType = {
    userId: number,
    id: number,
    title: string
}

function DetailList(){
    // state
    let [itemTitle, setItemTitle] = useState<photoType[]>([
        {
            userId: 1,
            id: 4,
            title: "non esse culpa molestiae omnis sed optio"
        },
        {
            userId: 1,
            id: 5,
            title: "eaque aut omnis a"
        }
    ]);
    var [likes, setLikes] = useState([0,0,0]);
    var [isOpenModal, setOpenModal] = useState(false);
    var [isTimeout, setIsTimeout] = useState(false);
    var [isCorrectInputValidation, setIsCorrectInputValidation] = useState(true);


    // url param
    const { posts } = useParams();
    console.log("posts:::", posts);

    // context
    const state = useContext(Context);
    console.log("state by context api:::", state);


    // fetchData
    const fetchData = async (): Promise<photoType[]> => 
        await fetch('https://jsonplaceholder.typicode.com/posts/' + posts).then((result)=>{
            console.log("res",result.json());
            return result.json();
        }).catch((error)=>{
            return error;
        })

    // hook
    useEffect(()=>{
        setTimeout(()=>{
            setIsTimeout(true);
        },2000)
    })

    useEffect(()=>{
        fetchData();
    }, [posts]);


    
    function toggleModal(){
        setOpenModal(!isOpenModal);
    }

    function countUpLikes(likes: number[], index: number){
        const copyLikes = [...likes];
        copyLikes[index] = copyLikes[index]+1;
        setLikes(copyLikes);
    }

    return (
        <>
        {
            isOpenModal ===  true ?
            <Modal></Modal> :
            null
        }
        {
            isTimeout === true ?
            null :
            <div className="alert alert-warning">2초 뒤에 세일 쿠폰이 사라집니다!</div>
        }
        {
            itemTitle.map((titleElement, index)=>{
            return(
                <div className='list' key={index}>
                <input onChange={(e)=>{
                    if (isNaN(e.target.value as any)){
                        setIsCorrectInputValidation(false);
                    }else{
                        setIsCorrectInputValidation(true);
                    }
                }}></input>
                {
                    isCorrectInputValidation === false ?
                    <div>숫자로 입력하십쇼</div> :
                    null
                }
                <h4><span onClick={toggleModal}>{titleElement.title}</span>
                    <div>2월 17일 발행</div>
                    <button onClick={()=>{countUpLikes(likes, index)}}>♥</button>
                </h4>
                <span>{likes[index]}</span>
                </div>
            );
            })
        }
        </>
    );
}

export default DetailList;