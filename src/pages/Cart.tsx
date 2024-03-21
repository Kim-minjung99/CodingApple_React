import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/jsx-runtime';
import { countUp } from '../store/store';
import {changeName, countUpAge} from '../store/userSlice';

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

type reduxType2 = () => string

function Cart(){

    const dispatch = useDispatch();

    const cart = useSelector((state: reduxType)=>{
        return state.cart;
    })
    console.log("cart", cart);

    // store에 있는 모든 state에 남아있게된다.
    const user = useSelector((state: reduxType)=>{
        return state.user;
    })
    console.log("a:::",user);
    return (
        <div>
            {user.name}님, 어서오세요.
            당신의 나이는 {user.age}입니다.
            <button onClick={()=>{dispatch(changeName())}}>변경하기</button>
            <button onClick={()=>dispatch(countUpAge(100))}>나이증가</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((element: cartType, index)=>{
                            return (
                                <Fragment key={index}>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{element.id}</td>
                                        <td>{element.count}</td>
                                        <td>
                                            <button onClick={()=>{dispatch(countUp(element.id))}}>수량추가</button>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    );
}
export default Cart;