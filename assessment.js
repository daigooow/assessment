'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param{HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while (element.firstChild){
        //子供の要素があるかぎり削除
        element.removeChild(element.firstChild)
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空のときは処理を終了する
        return;
    }

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph =document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag='+
    encodeURIComponent('あなたのいいところ')+
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className='twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText='Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    //widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところは声です。{userName}の声は心にのこります',
    '{userName}のいところはまなざしです。{userName}に見つめられた人は気になって仕方ないでしょう',
    '{userName}のいいところは情熱です。{userName}の情熱にまわりの人は動かされます',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとを成功させます',
    '{userName}のいいところは知識です。{userName}の豊富な知識にみんな期待しています',
    '{userName}のいいところはユニークさです。{userName}はいつもみんなを楽しませています',
    '{userName}のいいところは用心深さです。{userName}の洞察に多くの人が助けられています',
    '{userName}のいいところは見た目です。{userName}の内面からくる良さがみんなを惹きつけています',
    '{userName}のいいところは決断力です。{userName}の決める力にいつも助けられている人がいます',
    '{userName}のいいところは思いやりです。{userName}に気にかけてもらった人が感謝しています',
    '{userName}のいいところは感受性です。{userName}の豊かな感情表現に多くの人が心を動かされています。',
    '{userName}のいいところは節度です。{userName}の分別ある行動に多くの人が助けられています。',
    '{userName}のいいところは好奇心です。{userName}の新しいことに取り組む姿勢が魅力的です。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。{userName}のありのままが良いところです。',
    '{userName}のいいところ自制心です。自分の感情をコントロールできる{userName}の理性が尊敬を集めています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName ユーザーの名前
 * @return{string}診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode=0;
    for(let i=0;i<userName.length;i++){
        sumOfCharCode=sumOfCharCode+userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index=sumOfCharCode%answers.length;
    let result=answers[index];

    result=result.replace(/\{userName\}/g,userName);
    return result;
    }

    //テストコード
    console.assert(
        assessment('太郎') ===
         '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
         '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
