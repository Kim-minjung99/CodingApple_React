import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useParams } from 'react-router-dom';
import { Context } from "../App";
import { countUp } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

type ItemType = {
    userId: number,
    id: number,
    title: string,
    count? : number
}

type reduxType = {
    user : UserType,
    cart : cartType[]
}

type UserType = {
    name : string,
    age : number
}

type cartType = {
    id : number,
    name : string,
    count : number
}

function DetailList(){
    // state
    let [itemTitle, setItemTitle] = useState<ItemType[]>([
        {
            id : 0,
            title : 'White and Black',
            userId:1 ,
            count : 2},
        {
            userId: 1,
            id: 4,
            title: "non esse culpa molestiae omnis sed optio",
            count:0
        },
        {
            userId: 1,
            id: 5,
            title: "eaque aut omnis a",
            count:1
        }
    ]);
    // var [likes, setLikes] = useState([0,0,0]);
    var likes = useSelector((state: reduxType)=>{
        console.log("likjes",state.cart)
        return state.cart;
    })

    var [isOpenModal, setOpenModal] = useState(false);
    var [isTimeout, setIsTimeout] = useState(false);
    var [isCorrectInputValidation, setIsCorrectInputValidation] = useState(true);

    var [showModalItem, setShowModalItem] = useState<ItemType>();


    // url param
    const { posts } = useParams();
    console.log("posts:::", posts);

    // context
    const state = useContext(Context);
    console.log("state by context api:::", state);


    // fetchData
    const fetchData = async (): Promise<ItemType[]> => 
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

    // redux
    const dispatch = useDispatch();

    // function
    function toggleModal(){
        setOpenModal(!isOpenModal);
    }

    function showItemToModal(modal : ItemType){
        console.log("moal", modal);
        toggleModal();
        setShowModalItem(modal);
    }

    // function countUpLikes(likes: number[], index: number){
    //     const copyLikes = [...likes];
    //     copyLikes[index] = copyLikes[index]+1;
    //     setLikes(copyLikes);
    // }

    return (
        <>
        {
            isOpenModal ===  true ?
            <Modal modalItem={showModalItem}></Modal> :
            null
        }
        {
            isTimeout === true ?
            null :
            <div className="alert alert-warning">2초 뒤에 세일 쿠폰이 사라집니다!</div>
        }
        {
            itemTitle.map((titleElement: ItemType, index)=>{
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
                <h4><span onClick={()=>{showItemToModal(titleElement)}}>{titleElement.title}</span>
                    <div>2월 17일 발행</div>
                    <button onClick={()=>{dispatch(countUp(titleElement.id))}}>♥</button>
                </h4>
                <span></span>
                </div>
            );
            })
        }
        </>
    );
}

export default DetailList;