<img width="400px" src="https://user-images.githubusercontent.com/110869913/229155539-6ab87d36-3d0b-4ac6-97dc-6acc25412230.jpg"/>
Noted는 PDF 불러오기부터 수정된 PDF를 저장하는 것까지 핵심 기능만을 제공하여 누구나 쉽게 PDF를 편집하고 메모를 남길 수 있는 PDF Editor 서비스 입니다. AWS S3 cloud 서비스를 이용하기 때문에,언제 어디서든 사용자가 작업한 PDF를 열어서 수정할 수 있습니다.

<br/>

## 𝌞 CONTENTS
  * [🎬 Preview](#-preview)
  * [📌 Introduction](#-introduction)
  * [🌋 Challenges](#-challenges)
    * [Login](login)
      * [1)로그인 인증 관리를 어떻게 효율적으로 관리할 수 있을까?](로그인-인증-관리를-어떻게-효율적으로-관리할-수-있을까?)
      * [2)토큰이 탈취당할 위험에 대처하는 방법](토큰이-탈취당할-위험에-대처하는-방법)
    * [PDF](pdf)
      * [1) PDF를 어떻게 불러올까?](PDF를-어떻게-불러올까?)
      * [2) 불러온 PDF를 어떻게 화면에 보여줄 수 있을까?](불러온-PDF를-어떻게-화면에-보여줄-수-을까?)
      * [3) 어떻게 저장할까?](어떻게-저장할까?)
    * [Editor](editor)
      * [1) Canvas API를 통해서 undo/redo를 어떻게 구현할까?](Canvas-API를-통해서-undo/redo를-어떻게-구현할까?)
      * [2) 캔버스에 원하는 크기대로 지울 수 있는가?](캔버스에-원하는-크기대로-지울-수-있는가?)
      * [3) S3에 저장된 글꼴 파일을 텍스트에 어떻게 적용할 수 있을까?](S3에-저장된-글꼴-파일을-텍스트에-어떻게-적용할-수-있을까?)
      * [4) bold 적용하기](bold-적용하기)
  * [🌐 Tech Stacks](#-tech-stacks)
  * [🔗 Repository Link](#repository-link)
  * [👨‍💻 Member](#member)

<br/>

## 🎬 Preview

(시연 동영상)

<br/>

## 📌 Introduction

### Motivation

평소에 E-book을 읽을때마다 “나의 생각을 옆에 메모할 수 있으면 좋겠다.”라는 생각을 했습니다. 그렇게 시중에 제공되고 있는 서비스들을 찾아보니 태블릿 사용자를 위한 서비스는 많았으나 웹기반으로 된 PDF 에디터는 동시수정 등 다양한 기능들을 제공하는 대신, 유료인 것들이 많았습니다. 

따라서, 저희가 배운 MERN 스택을 이용하여 필기 및 간단한 텍스트 입력이 가능한 PDF 에디터를 구현해볼 수 있지 않을까? 라는 생각에 개발을 시작하게 되었습니다.

### Schedule
**프로젝트 기간 : 2023.03.06 ~ 2023.03.31 / 기획 10일 개발 15일**

<details>
<summary>1 주차 : 기획 및 설계</summary>
<div markdown="1">
- 아이디어 수집<br/>
- 기술 스택 선정<br/>
- Git 작업 플로우 결정<br/>
- 코드 컨벤션, 커밋 룰 등 팀 협업 규칙 정립<br/>
- Figma를 사용한 Mockup 제작<br/>
- MongoDb를 이용한 DB Schema 설계<br/>
- Notion을 이용한 칸반 작성<br/>
</div>
</details>

<details>
<summary>2주차 ~ 3주차 : 기능 개발</summary>
<div markdown="1">
- 백엔드 서버 구현<br/>
- AWS S3 세팅<br/>
- Firebase 구글 로그인 & JWT(access token, refresh token) 구현<br/>
- 프론트 엔드 기능 구현<br/>
- 리드미 작성<br/>
- 팀 프로젝트 발표 준비 및 발표<br/>
- 배포<br/>

</div>
</details>

<br/>

## 🌋 Challenges

개발을 진행하면서 많은 시행착오들이 있었지만, 그 중 제일 핵심적인 것들은 크게 3가지 였습니다. 

## 1. Login
### 1) 로그인 인증 관리를 어떻게 효율적으로 관리할 수 있을까?

저희는 Firebase Google 인증을 사용하여 Google 계정으로 로그인할 수 있도록 하였습니다. 그러다 사용자별 로컬 파일 데이터를 AWS의 S3 저장소에 생성해줘야하기 때문에 회원관리의 필요성을 느끼게 되었습니다. 그래서 Firebase Google 인증도 사용하고 서버에 부담이 되지 않는 JWT(JSON Web Token)를 생성하여 서버에서 사용자를 인증하는 동시에 안전하고 효율적인 인증 관리를 하도록 하였습니다.

 JWT는 인증에 필요한 정보들을 암호화시킨 JSON 토큰으로 서버에 따로 DB를 만들지 않고 클라이언트가 서버에 접속을 하면 서버에서 해당 클라이언트에게 인증되었다는 것을 확인하기 때문에 서버에 부담이 없습니다.

### 2) 토큰이 탈취당할 위험에 대처하는 방법

JWT는 토큰을 탈취 당하면 대처가 어렵기 때문에 위험성이 있어 그대로 사용하는 것이 아닌 Access Token, Refresh Token으로 이중으로 나누어 인증을 하는 방식을 사용하였습니다. JWT는 발급한 후 삭제가 불가능하기 때문에 접근에 관여하는 토큰에 유효시간을 부여하는 식으로 Accress Token은 1시간, Refresh Token은 2주로 설정해주었습니다.

저희은 access token과 refresh token을 쿠키에 담아 클라이언트에게 보내기 때문에 5가지 시나리오를 작성하여 구현하였습니다.

- 5가지 시나리오
  1) access token과 refresh token이 둘다 유효한 경우 → <OpenPef> 페이지로 이동
  2) access token이 만료되고 refresh token도 만료된 경우 → <Login> 페이지로 이동
  3) access token이 만료되고 refresh token은 만료되지 않은 경우 → 새 access token 발급한 후 <OpenPef> 페이지 이동
  4) access token이 만료되지 않은 경우 → <OpenPef> 페이지로 이동 <br/>
  (refresh token은 access token을 재발급해주기 위한 수단이기 때문에 access token만 유효하다면 메인 페이지로 넘어가도록 하였습니다.)
  5) 쿠키에 access token과 refresh token이 없는 경우 → <Login> 페이지로 이동
  <img width="700px" src="https://user-images.githubusercontent.com/110869913/229177945-d8f8e5c9-5a40-4c89-bc18-6976e98dfba6.png"/>

## 2. PDF

### 1) PDF를 어떻게 불러올까?

웹에디터라면 기본적으로 사용자의 Local 저장소에 있는 파일을 불러올 수 있어야한다고 생각했고, 인터넷이 되는 곳이라면 어디에서든 작업중이던 PDF를 불러올 수 있도록 하기 위하여 mongoDB에 PDF 파일을 저장하려고 하였습니다. 하지만, mongoDB에서 제공하는 document의 최대용량이 16MB로 PDF 파일 자체를 저장하기에는 한계가 있었습니다. 따라서, 아마존에서 제공하는 클라우드 기반 storage 서비스인 AWS S3(Simple Storage Service)에 PDF 파일을 저장하고 S3 URL을 mongoDB에 저장하기로 하였습니다. 하지만, schema 구조를 작성하다보니 이미 생성된 user_id와 document_id를 조합하여 S3 URL을 구성하였습니다.

- Local 저장소에 있는 PDF 업로드 하기
    
    PDF는 Portable Document Format의 약자로 다양한 운영 체제에서 일관되게 보여지고 인쇄할 수 있는 전자문서 형식입니다. 따라서, 서버에 요청을 보낼때, PDF 파일 자체가 전송되는 것이 아니라 HTTP request body에 담아 서버로 전송해야 했습니다. 그리고 HTTP request body 에 담아서 보내기 위해서는 FormData API를 사용해야 합니다. FormData API는 파일과 같은 바이너리 데이터와 Key-Value 쌍을 포함하는 양식 데이터를 쉽게 구성하고 전송할 수 있는 방법으로, append 메서드를 사용하여 사용자가 선택한 파일을 추가하여 서버로 전송하였습니다. 이때, PDF 파일을 보내는 것이기 때문에 HTTP Header에 들어가는 content-type은 multipart/form-data로 설정합니다. 그리고 최종적으로 withCredential을 ture로 설정하여 CORS 요청을 허용하고 인증된 회원임을 증명해야하기 때문에 쿠키값도 함께 전달할 수 있게 하였습니다. 
    
    <img width="700px" src="https://user-images.githubusercontent.com/110869913/229178753-52c17257-42a6-464a-98eb-68cb41e7088f.png"/>

    서버에서는 요청이 들어오면 MongdoDB에 PDF model을 생성하고, 이때 생성되는 document_ID 값과 user ID값을 기반으로 S3에 파일을 업로드 합니다.
    
    <img width="700px" src="https://user-images.githubusercontent.com/110869913/229178824-b9e71675-1f76-4c60-b09a-5077aba76f71.png"/>
    
    S3 업로드가 완료되면 해당 document_id를 User의 pdfDocuments 배열에 추가합니다. 그리고 PDF가 랜더링 되는 페이지로 이동합니다. 
    
- S3에 저장되어 있는 PDF 불러오기
    
    저희는 로그인한 사용자별로 작성한 PDF 문서들을 관리해야했기 때문에 DB에 저장되는 schema를 구성할 때, User에 대한 Model을 만들고 mongoose의 Model.populate라는 query를 사용하여 PDF Model을 참조하도록 하였습니다. 
    
    따라서, 사용자가 로그인하면 user_id 값으로 pdfDocument 배열을 순회하며 S3에 저장된 파일들의 리스트를 보여줍니다. 사용자가 파일의 제목을 클릭하면 PDF가 랜더링 되는 페이지로 이동합니다. 

    <img width="600px" src="https://user-images.githubusercontent.com/110869913/229180109-7afb4443-0df8-42db-a8c9-4f812a9fc21c.png"/>    

→ 왜 한번에 S3 url로 안불러오고 서버를 거쳤는가? 
클라이언트 -> 서버 -> S3 파일 가져오기 순서를 거치면 서버가 인증 프로세스를 처리하고 권한이 있는 사용자만 파일에 액세스할 수 있도록 할 수 있습니다.

또한,  많은 사용자가 파일에 액세스하거나 대용량 파일인 경우, S3에서 직접 파일을 가져오면 S3 버킷에 과부하가 걸리고 성능에 영향을 미칠 수 있습니다. 

### 2) 불러온 PDF를 어떻게 화면에 보여줄 수 있을까?

 초기에는 PDF 랜더링을 직접 구현하려고 하였으나, 2주라는 제한된 시간을 적절히 사용하는 것도 중요한 요소 중 하나이기 때문에 ‘에디터’라는 메인 기능에 집중하기 위하여 라이러리를 사용하기로 하였습니다. 

 PDF를 랜더링하는 라이브러리에는 대표적으로 PDF.js, react-PDF, PDFkit 등이 있는데 PDF.js는 HTML5, CSS3, JavaScript와 같은 웹 표준 기술만으로 PDF 파일을 렌더링하기 때문에 특정 플러그인이나 소프트웨어가 필요하지 않다는 장점이 있습니다. 

 그리고 React-PDF는 문서, 페이지, 텍스트와 같이 미리 빌드된 여러 컴포넌트를 제공하기 때문에 React 환경에서 PDF 파일을 쉽게 렌더링할 수 있고 가볍다는 장점이 있습니다. 하지만, React-PDF는 내부에서 PDF.js를 사용하여 PDF 파일을 렌더링하는 high level API이기 때문에, 저희가 직접 PDF.js를 사용해보는 취지로 PDF.js를 선택하게 되었습니다.

~~(React와 PDF.js를 기반으로 한 라이브러리로 이기 때문에 저희가 직접 PDF.js를 사용해보는 취지로 PDF.js를 선택하게 되었습니다.)~~

하지만 라이브러리를 사용하는 것 또한 내장 메서드들이 어떻게 동작하는지 파악하기 위해 API 문서와 github open source 코드들을 이해해야 했습니다.  

PDFjs의 공식문서를 보면 pdfjsLib에서 getDocument 메소드를 호출하여 PDF를 불러옵니다.

[PDFjs-example](https://mozilla.github.io/pdf.js/examples/)

```jsx
const loadingTask = pdfjsLib.getDocument('helloworld.pdf');
loadingTask.promise.then(function(pdf) {
  // you can now use *pdf* here
});
```

그리고 pdfjsLib 모듈에 들어가서 getDocument 메소드를 찾아봤더니, `{PDFDocumentLoadingTask}`을 반환합니다.

[PDF.js/pdfjsLib/getDocument](https://github.com/mozilla/pdf.js/blob/master/src/display/api.js)

```jsx
/**
 * This is the main entry point for loading a PDF and interacting with it.
 *
 * NOTE: If a URL is used to fetch the PDF data a standard Fetch API call (or
 * XHR as fallback) is used, which means it must follow same origin rules,
 * e.g. no cross-domain requests without CORS.
 *
 * @param {string | URL | TypedArray | ArrayBuffer | DocumentInitParameters}
 *   src - Can be a URL where a PDF file is located, a typed array (Uint8Array)
 *         already populated with data, or a parameter object.
 * @returns {PDFDocumentLoadingTask}
 */
function getDocument(src) {
  if (typeof PDFJSDev === "undefined" || PDFJSDev.test("GENERIC")) {
    if (typeof src === "string" || src instanceof URL) {
      src = { url: src };
    } else if (isArrayBuffer(src)) {
      src = { data: src };
    }
  }
```

그리고 반환값인 PDFDocumentLoadingTask에 대해 살펴보면, PDF문서로 resolve하는 promise 속성이 있기때문에 .promise를 붙여줘야 합니다.

[PDFDocumentLoadingTask](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFDocumentLoadingTask.html)

### 3) 어떻게 저장할까?

 처음에는 puppeteer로 저장하는 방식을 생각했습니다.  puppeteer를 활용하면 가상 브라우저를 통해 원하는 URL의 sanapshot을 찍어 pdf로 만들 수 있기 때문입니다. 하지만 puppeteer로 우리 브라우저에 접근한다면 몇가지 문제가 있었습니다.
 
```jsx
// 처음 구상했던 puppeteer를 활용한 PDF 저장 방식
const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("URL", { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

router.get("/save-pdf", async function (req, res, next) {
  printPDF().then((pdf) => {
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    console.log(pdf, "pdf");
    res.send(pdf);
  });
});
```

- 우리 브라우저에 접근하기 위해서는 유저의 아이디와 비밀번호를 puppeteer에 넘겨주어야 했습니다. 하지만, 우리는 구글 auth를 이용한 로그인 방식을 이용하고 있기에, 유저의 비밀번호를 취득할 수 없었습니다. 그렇다고 저장을 puppeteer가 접근 할 수 있는 별도의 로그인 로직을 만든다는건, 비효율적이며 저장 로직의 본질을 벗어난 것이라 생각했습니다.
- 유저의 아이디를 넘겨주거나, 별도의 로직으로 puppeteer가 로그인에 성공한다 하더라도, 현재 유저가 작업한 상태는 puppeteer가 접근했을 때 반영되지 않습니다. 현재 작업 영역의 상태를 반영시키기 위해서는, 현재 유저가 작업한 모든 내용을 puppeteer가 모두 똑같이 수행해야 하는 과정이 필요했습니다.
- 모든 상태를 그린다 하더라도, puppeteer 현재 페이지에 렌더링된 원본 PDF의 각 요소(텍스트, 이미지, 링크 등)를 puppeteer는 구분하지 못할 것이었습니다. 왜냐하면, 우리가 페이지에 보여주고 있는 PDF는 `canvas API`로 작업을 하기 위해 `canvas` 태그로 렌더링 되어있었고, 원본 PDF의 요소(텍스트, 이미지, 링크 등)를 모두 무시한채 이미지 파일로 저장 될 것이었기 때문입니다. 우리의 프로젝트는 PDF 에디터 였으므로, PDF의 요소를 훼손시킨다면 PDF에디터의 의미가 퇴색될 것이라 생각했습니다.

결국 단순히 snapshot을 찍어 PDF를 저장하는 방식이 아니라, 상태에 기반하여 그림요소와 텍스트 요소를 만들어 새로운 PDF를 생성하는 방식을 선택했습니다. 이를 위해 선택한 라이브러리가 PDF-LIB이었습니다. 
- PDF-LIB은 오픈소스 라이브러리 랭킹 플랫폼인 openbase에서 상위권에 위치한 만큼 많은 사용자가 있어 정보를 얻기 수월할 것이라 생각했습니다.
- 우리가 필요로 했던, 원본 PDF에 이미지와 텍스트를 삽입할 수 있는 기능이 있었습니다.

```jsx
// 간단한 PDF저장 예시
const pdfDoc = await PDFDocument.load(...)
const pages = pdfDoc.getPages()

const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
const pngImage = await pdfDoc.embedPng(pngImageBytes)

firstPage.drawText('This text was added with JavaScript!', {
  x: 5,
  y: height / 2 + 300,
  size: 50,
  font: helveticaFont,
  color: rgb(0.95, 0.1, 0.1),
})
page.drawImage(pngImage, {
    x: page.getWidth() / 2 - jpgDims.width / 2,
    y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
    width: jpgDims.width,
    height: jpgDims.height,
  })

const pdfBytes = await pdfDoc.save();
```
 다만 PDF에 추가될 이미지와 텍스트의 모든 속성값(좌표, 텍스트, 색상, 크기, 폰트)을 상태로 보관 할 필요가 있었고, 해당 좌표를 저장 시 PDF페이지 내에 정확히 반영해주기 위한 작업을 수반해야 했습니다.
 
 1. 그림요소의 경우 상태에 저장된 데이터(좌표, 색상, 투명도, 두께)를 빈 저장 할 PDF의 크기와  동일한 캔버스에 그려 해당 캔버스를 PNG로 저장했습니다.
 
 ```jsx
 const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = CONSTANT.CANVAS_WIDTH;
    canvas.height = CONSTANT.CANVAS_HEIGHT;

    drawingData.forEach((drawing) => {
      context.beginPath();
      context.moveTo(drawing[0]?.xPoint, drawing[0]?.yPoint);
      for (let i = 1; i < drawing.length; i += 1) {
        context.lineJoin = "round";
        context.lineCap = "round";
        context.strokeStyle = drawing[i]?.color;
        context.lineWidth = drawing[i]?.width;
        context.globalAlpha = drawing[i]?.opacity;
        context.lineTo(drawing[i]?.xPoint, drawing[i]?.yPoint);
        context.stroke();
      }
    });

    const imageData = canvas.toDataURL("image/png"); 
    // 상태값이 그려진 캔버스를 png로 저장
    const imageDataBytes = await fetch(imageData).then((res) =>
      res.arrayBuffer(),
    );
    const pdfImage = await loadPdf.embedPng(imageDataBytes);
    // arrayBuffer형식의 png파일을 pdf-lib의 메소드의 인자로 전달
    page[index].drawImage(pdfImage, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });
    // 상태에 해당하는 페이지에 저장
 ```

2. 이미지 요소는 PDF와 동일한 크기에 상태를 토대로 그림을 그려 저장했기에 크게 어려움이 없었습니다. 반면, 포스트잇(포스트잇 박스, 텍스트)의 경우 캔버스에 그릴 수 없어, PDF에 직접 좌표를 지정하며 삽입해야 했습니다. 우리가 상태에 저장했던 x,y좌표는 canvas의 left-top이 0,0을 가리켰지만, PDF-LIB에서 left-bottom위치가 x,y의 0,0좌표를 나타냈습니다. Y축을 반전하여 생각할 필요가 있었습니다. 또한 포스트잇 박스를 그릴 때에는 해당 지정한 y축을 기점으로 top방향이 아닌, bottom방향으로 도형이 그려지기에 위치를 잡을 때 다소 번거로움이 있었습니다. 결국 아래와 같이 이해하기 힘든 코드를 작성하게 되었습니다. 

```jsx
// 포스트잇 네모 박스를 그리는 과정
  page[index].drawRectangle({
    x: postItX + POST_IT_BORDER,
    y:
      CANVAS_HEIGHT - // 캔버스의 높이
      postItY -  // 포스트잇의 Y축
      POST_IT_SIZE - // 포스트잇의 사이즈
      POST_IT_PADDING - // 포스트잇의 패딩
      POST_IT_BORDER,  // 보스트잇의 border
    width: POST_IT_SIZE + POST_IT_PADDING * 2,
    height: POST_IT_SIZE + POST_IT_PADDING * 2,
    color: yellow,
    borderWidth: POST_IT_BORDER,
    opacity: 0.6,
  });
```

3. 위의 포스트잇 박스 뿐만 아니라, 포스트잇의 close버튼, close버튼 안에 있는 x 문자, 포스트잇의 텍스트를 그리는 데에도 위와 같이 직접 좌표를 지정하며 하나하나 그려야 했기에 가독성이 나빠질 수 밖에 없었습니다. 하지만, 포스트잇의 특성 중 하나인 텍스트를 살리기 위해서는 위와 같이 직접 그려야만 했습니다.

4. 포스트잇에 작성된 텍스트가 한줄이 넘어갔을 때는 또 다른 문제가 발생했습니다. 에디터 내에서 작업할 때에는 텍스트가 포스트잇의 넓이를 넘어갔을 때, 자동으로 개행이 되었습니다. 하지만, 우리 프로젝트는 별도의 텍스트 박스를 사용하는게 아니라, 텍스트 박스라는 그림요소 위에 텍스트를 작성하는 것이었기에, 넓이를 측정하여 별도의 개행을 해주었습니다. 다행히 `widthOfTextAtSize`라는 PDF-LIB의 메소드에 텍스트와 폰트 사이즈를 인자로 넣어주면, 작성된 텍스트의 넓이를 구할 수 있었습니다. 텍스트의 넓이를 구하며, 우리 포스트잇의 넓이보다 넓어졌을 때, 텍스트의 폰트 사이즈만큼 좌표를 옮겨서 텍스트를 입히는 로직을 작성할 수 있었습니다.

```jsx
  const splitText = (wholeText) => {
    let text = "";
    const result = [];
    for (let i = 0; i < wholeText.length; i += 1) {
      text += wholeText[i];
      const textWidth = standardFont.widthOfTextAtSize(
        text,
        Number(fontSize.split("px")[0]),
      );
      if (textWidth > POST_IT_SIZE) {
        result.push(text);
        text = "";
      }
    }
    result.push(text);
    return result;
  };

  const result = splitText(contents);

  result.forEach((text, textIndex) => {
    page[index].drawText(text, {
      x: postItX + POST_IT_PADDING + POST_IT_BORDER + 5,
      y:
        CANVAS_HEIGHT -
        POST_IT_BORDER -
        POST_IT_PADDING -
        postItY -
        POST_IT_CLOSE_BOX_SIZE -
        (textIndex + 1) * Number(fontSize.split("px")[0]) +
        5,
      size: Number(fontSize.split("px")[0]),
      lineHeight: Number(fontSize.split("px")[0]),
      color: black,
      font: standardFont,
      maxWidth: POST_IT_SIZE - POST_IT_PADDING * 2,
      opacity: 1,
    });
  });
```

5. 하지만 위의 로직에도 이따금씩 1,2번째 개행이 겹쳐서 그려지는 경우가 발생하였습니다. wordbreak기능을 고려하던가 알고리즘을 수정하고 싶었으나, 현재 프로젝트의 기간이 종료되어 향후 보완할 점으로 남겨두고 프린트 기능은 마무리 하도록 했습니다.

6. 다소 아쉽게 PDF저장 기능이 완료 되었으나 우리가 작성한 폰트, 이미지, 그리고 기존 문서의 Link 기능까지 모두 해치지 않는 PDF저장을 구현할 수 있게 되었습니다. 


## 3. Editor

### 1) Canvas API를 통해서 undo/redo를 어떻게 구현할까? 

- **Canvas API 선택 이유?**

Canvas를 사용하는 이유는 JavaScript를 사용하여 웹 페이지에서 그래픽을 조작하고 그릴 수 있는 방법을 제공하기 때문입니다. pdf.js 라이브러리를 사용하여 PDF 파일을 구문 분석하고 이미지 데이터를 추출하게 되면 PDF 페이지를 이미지로 렌더링을 할 수 있습니다.

- **Canvas API로 그림을 그리는 원리**

PDF 페이지와 동일한 크기로 생성한 Canvas 태그를 useRef로 불러오고 getContext(”2d”) 메서드를 사용하여 캔버스에 대한 2D 렌더링 컨텍스트를 가져옵니다. 그리고 mousedown, mousemove 이벤트의 콜백 함수로 그림을 그리는 함수를 호출하며, mouseup 이벤트가 발생했을 때 이벤트 리스너를 제거하여, 더이상 그림이 그려지지 않도록 합니다.

```jsx
    
    const handleMouseDown = (event) => {
      const x = event.offsetX;
      const y = event.offsetY;

      context.beginPath(); // 드로잉 시 새로운 path가 시작함을 인식
      context.moveTo(x, y); // 드로잉 시 그려질 요소의 시작점을 인식

      canvas.addEventListener("mousemove", drawWhenMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    };

    const drawWhenMouseMove = (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.globalAlpha = globalOpacity;
      context.strokeStyle = globalColor;
      context.lineWidth = globalWidth;
      // 그려질 선에 대한 스타일로, 글로벌 상태에 기반한다.

      context.lineTo(x, y); // moveTo로부터 선이 이어질 다음 좌표 - 움직일때 마다 갱신
      context.stroke();  // moveTo의 좌료포부터 lineTo까지 선을 그어준다.
    };

    const handleMouseUp = () => {
      dispatch(pushDrawingDataCurrentPage(linePoints));

      canvas.removeEventListener("mousemove", drawWhenMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };

```

- **에디터 툴을 활용한 그림의 상태 관리**

위 예시의 drawWhenMouseMove 함수에서 확인 가능한 대로, 그려지는 그림의 스타일은 상태에 기반합니다. globalOpacity, globalColor, globalWidth 은 툴바의 작업도구와 작업 도구의 스타일을 선택함에 따라 리덕스의 글로벌 상태관리에 반영됩니다. 

<img width="626" alt="image" src="https://user-images.githubusercontent.com/110869913/235928308-284aca91-5256-4885-8fc8-980efcf390b9.png">

 펜을 클릭 하면 펜의 default 색상, 두께, 투명도가 적용되며, 형광펜을 선택하면 형광펜의 default 색상, 두께, 투명도가 적용됩니다. 펜과 형광펜을 각각 선택할 때 마다 선택한 작업 도구의 스타일을 선택 할 수 있는 툴바가 렌더링 되며, 선택한 스타일은 상태로 반영됩니다.
 이렇게 반영된 상태는 유저가 다른 작업도구(ex 형광펜)를 선택하다 기존 작업 도구(ex 볼펜)를 다시 선택하더라도, 유저가 선택한 최신의 상태가 반영되며, 유저가 기존 작업 도구를 다시 쓸 때 연속성 있는 경험을 느낄 수 있도록 하였습니다. 
 
 ```jsx
   export const changeGlobalToolOption = (tool) => (dispatch, getState) => {
    const selectToolColor = (state) => state.editor[tool].color; 
    const selectToolWidth = (state) => state.editor[tool].width;
    const selectToolOpacity = (state) => state.editor[tool].opacity;

    const color = selectToolColor(getState());
    const width = selectToolWidth(getState());
    const opacity = selectToolOpacity(getState());
    // 유저가 클릭한 작업도구(ex. "pencil", "highlight pen")의 최신 style을 열람

    dispatch(setGlobalStyle({ tool, color, width, opacity }));
    // 최신 스타일을 글로벌 style로 반영하는 reducer 함수를 dispatch
  };
 ```
해당 기능은 custom thunk를 활용해서 구현했습니다. UI 컴포넌트에서 현재 작업도구에 대한 상태를 구독하여 현재 작업도구의 최신 상태를 반영 할 수 도 있었지만, custom thunk를 사용하여 불필요하게 현재 작업도구에 대한 상태를 빼줄 필요가 없고, UI 컴포넌트를 가볍게 할 수 있었습니다. 현재 그림을 그리는 커스텀 훅은 작업도구에 대한 상태를 구독할 필요 없이 globalColor, globalWidth, globalOpacity 만을 구독합니다.

```jsx
  const globalColor = useSelector(selectGlobalColor);
  const globalWidth = useSelector(selectGlobalWidth);
  const globalOpacity = useSelector(selectGlobalOpacity);
```
- ** 두개의 Stack 구조로 UNDO/REDO 구현**
UNDO/REDO 기능은 두개의 Stack구조 데이터를 활용해서 구현했습니다. UNDO 버튼을 클릭하면, 상태에 보관된 해당 페이지의 DrawingData의 마지막 그림요소(lineData)를 제거하여 RedoData에 반영해줍니다. 반대로 REDO 버튼을 클릭하면, RedoData의 마지막 그림요소(lineData)를 제거하여 DrawingData에 반영해줍니다. 그리고, DrawingData 상태가 변환되면 호출되는 그리기 함수는 현재의 DrawingData 상태에 반영된 lineData들을 그려줍니다.

<img width="624" alt="image" src="https://user-images.githubusercontent.com/110869913/235928760-2d04e856-fea4-472c-b966-fdf0d17edbfa.png">

해당 기능은 custom thunk로 구현했습니다. 현재 페이지에 대한 상태와 DrawingData, RedoData에 대한 상태 구독이 필요했고, 해당 상태 구독을 리듀서 내에서 수행하여 UI컴포턴트를 가볍게 가져가고 싶었기 때문입니다.

```jsx
export const moveDataUndoArray = () => (dispatch, getState) => {
  const currentPage = selectCurrentPage(getState()); 
  const drawingArray = selectDrawingData(getState())[currentPage];
  // 현재페이지와, 현재 페이지의 drawingData 상태 확인

  if (drawingArray.length) {
    const poppedData = drawingArray[drawingArray.length - 1];
    const restDrawingArray = drawingArray.slice(0, drawingArray.length - 1);
  // RedoData에 반영할 DrawingData의 마지막 그림요소(lineData)를 선택 
  // & 마지막 그림요소(lineData)가 제거된 새로운 DrawingData를 생성
    dispatch(setDataUndo({ currentPage, restDrawingArray, poppedData }));
  }
  // 위의 가공된 정보를 인자로 상태반영
};
```


### 2) S3에 저장된 글꼴 파일을 텍스트에 어떻게 적용할 수 있을까?

저희는 S3에서 저장된 글꼴 파일을 받아와 텍스트에 적용하면 바로 적용이 되는 줄 알았습니다. 하지만 S3가 건네준 데이터는 스트림(데이터)을 읽을 수 있는 객체인 readableStream이였고 텍스트에 글꼴을 적용하기 위해서는 readableStream을 url로 변환해야했습니다.

찾아본 결과 Blob이라는 객체를 통해서  source(src)를 속성으로 가지는 모든 HTML 태그와 CSS 속성에서 사용 가능한 url로 변환할 수 있는 것을 확인하였습니다. Blob은 주로 텍스트, 이미지, 사운드, 비디오와 같은 대다수 용량이 큰 데이터를 객체 형태로 저장할 수 있는 객체입니다.

readableStream을 Blob 객체로 변환할 수 없어 arrayBuffer로 변환한 후에 Blob객체를 만들고 그 Blob객체를 url로 변환하였습니다. 이 url을 font-face에 src로 넣어주어 저희가 지정한 폰트명으로 해당 경로의 파일을 로드하여 글꼴을 적용하였습니다.


<br/>

## 🌐 Tech Stacks

### Client

`JavaScript, React, React-Redux Toolkit, styled-components, Firebase, PDF.js, pdf-lib`

### Server

`JavaScript, Node.js, Express.js, MongoDB & Mongoose, Amazon S3, JWT`

### Test

`Jest, Cypress`

### Deployment

`Netlify, AWS Elastic Beanstalk`


<br/>

## 🔗 Repository Link

### Deploy

(배포 후 링크 걸기)

- Noted

### Github Repositories

- [FrontEnd Repo](https://github.com/Thinking-in-human/Noted-client)
- [BackEnd Repo](https://github.com/Thinking-in-human/Noted-server)

<br/>

## 👨‍💻 Member

(이름에 깃헙 링크 걸기)

신휘재 : hwejae25@gmail.com

이지숙 : leejisook0718@gmail.com

장예진 : skyaiwn08@gmail.com


