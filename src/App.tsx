import './App.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import DetailList from './pages/DetailList';
import { createContext, useState } from 'react';

export let Context = createContext([""]);

function App() {

  const [state, setState] = useState(["a", "b", "c"]);


  const navigate = useNavigate();


  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 blog</div>
        <div>
          {/* onClick시 error issue */}
          {/* navigate()할당시 익명함수로 감싸지 않으면 컴포넌트 로드시 바로 실행 */}
          {/* 타입관련하여 매치되지 않는 이슈 발생 */}
          {/* trouble shooting : onClick 행위시 익명함수를 이용해서 1회성 동작하는 함수(navigate) 세팅 */}
          <div onClick={ ()=>{navigate("/")} }>home</div>
          <div onClick={ ()=>{navigate("/detail")} }>Detail</div>
          <div onClick={ ()=>{navigate(-1)} }>뒤로가기 버튼</div>
          <div onClick={ ()=>{navigate(1)} }>앞으로가기 버튼</div>
          {/* <Link to="/">home</Link>
          <Link to="/detail">Detail</Link> */}
        </div>
      </div>

      <Routes>
          <Route path="/:posts" element={ 
            <Context.Provider value={state}>
              <DetailList/> 
            </Context.Provider>
          }/>
        <Route path="/member" element={<div>member 페이지입니다. <Outlet></Outlet> </div>} >
          <Route path="detail" element={<div>멤버 디테일 페이지입니다.</div>} />
          <Route path="location" element={<div>멤버 위치 페이지입니다.</div>} />
        </Route>
        <Route path="*" element={<div>없는 페이지입니다.</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
