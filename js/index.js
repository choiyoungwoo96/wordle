let index = 0;
let attempts = 0;
const 정답 = "APPLE";
let timer = "";

function appStart() {
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    endGame();
    clearInterval(timer);
  };
  const endGame = () => {
    const div = document.createElement("div");
    div.innerText = "GAMEOVER";
    div.style =
      "display:flex; justify-content:center;align-items:center; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background-color:red;width:200px;height:100px;color:white;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    attempts++;
    index = 0;
    if (attempts === 6) {
      gameover();
    }
  };
  const keyboardCheck = (입력한_글자) => {
    const 키보드정답 = document.querySelector(
      `.keyboard-col[data-key='${입력한_글자}']`
    );
    키보드정답.style = "background-color:#6aaa64; color:white;";
  };
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.col-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6aaa64";
        block.style.color = "white";
        keyboardCheck(입력한_글자);
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#c9ba58";
        block.style.color = "white";
      } else {
        block.style.background = "#787c7e";
        block.style.color = "white";
      }
    }
    if (맞은_갯수 === 5) {
      gameover();
    } else {
      nextLine();
    }
  };
  //로직들
  const prehandle = () => {
    if (index > 0) {
      const 지워질박스 = document.querySelector(
        `.col-block[data-index='${attempts}${index - 1}']`
      );
      지워질박스.innerText = "";
    }
    index -= 1;
  };

  const handleKeydown = (e) => {
    //함수에서 빠져나올대는 return만 주면 된다.
    const key = e.key.toUpperCase();
    //toUpperCase();대문자 처리함수
    const keyCode = e.keyCode;
    const 변경될박스 = document.querySelector(
      `.col-block[data-index='${attempts}${index}']`
    );
    if (e.key === "Backspace") {
      prehandle();
    }
    if (index === 5) {
      if (e.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      // && 모두 만족했을때!
      변경될박스.innerText = key;
      index += 1;
    }
    // console.log(e.keyCode, e.key);
    // 키보드 이벤트들을 보면 다양한 event의 객체들을알수 있다.
  };
  const startTimer = () => {
    const time = new Date();
    function setTime() {
      const 현재 = new Date();
      const 흐른시간 = new Date(현재 - time);
      const 분 = 흐른시간.getMinutes().toString().padStart(2, 0);
      const 초 = 흐른시간.getSeconds().toString().padStart(2, 0);
      const timeH1 = document.querySelector(".time");
      timeH1.innerHTML = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}
appStart();
//변수는 띄어쓸수 없기 때문에 camel 표기법
//파이썬에서는 app start 스네이크 표현법 app_start
