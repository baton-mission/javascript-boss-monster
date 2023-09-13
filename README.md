# javascript-boss-monster

보스 몬스터 잡기 게임 미션을 위한 저장소

# 미션 - 보스 몬스터 잡기

## 🔍 진행방식

- 미션은 **기능 요구사항, 프로그래밍 요구사항, 과제 진행 요구사항** 세 가지로 구성되어 있습니다.
- 바톤 홈페이지에 글을 게시하면 리뷰어가 PR을 확인하고 코드리뷰를 진행할 예정입니다.
- 세 개의 요구사항을 만족하기 위해 노력합니다. 기능을 완성시키지 못해도, 요구 사항을 만족시키지 못해도 괜찮습니다. 하지만 과제 진행 요구사항을 만족시키지 못하면 리뷰어께서 PR을 보지 못할 수도 있기 때문에 리뷰가 불가능할 수도 있습니다. 꼭! 제출 전에 확인 부탁드립니다😊

## ✉️ 미션 제출 방법

- 미션 구현을 완료한 후 GitHub을 통해 Pull Request를 올립니다.
- Github에 Pull Request를 제출한 후 [바톤](http://baton-review.com)에 접속하여 글을 게시합니다.
- 자세한 제출 방법은 [바톤 미션 제출 문서](https://github.com/baton-mission/docs/blob/main/mission-guide.md) 를 참고하시면 됩니다.
  - **Pull Request만 보내고, 바톤 사이트에 게시하지 않는 경우에는 코드 리뷰를 도와드릴 수 없으므로 주의해주시면 감사하겠습니다.**

## ✔️ 미션 제출 전 체크리스트

- 미션 기능을 구현하고 아래 테스트를 통과하는지 확인해주세요.

```
npm install

npm run test
```

<img width="811" alt="Screenshot 2023-09-11 at 4 44 56 PM" src="https://github.com/2023baton/javascript-boss-monster/assets/116625502/0c1b9a7c-c6c4-4b8e-bf91-772887fdbc09">

---

## 🚀 기능 요구사항

간단한 보스 몬스터 잡기 게임을 구현한다.

- 보스 몬스터의 HP가 0이 되거나 플레이어의 HP가 0이 될 때까지 게임을 진행한다.
- 플레이어 이름은 5자 이하만 가능하다.
- 플레이어의 초기 HP와 MP 합은 200이다.
- 보스 몬스터 초기 HP는 100이상 300이하이다.
- 플레이어는 매 턴마다 보스 몬스터를 공격할 수 있다.
  - 물리 공격을 하면 보스 몬스터에게 10만큼의 데미지를 준다. (보스 몬스터의 HP가 10만큼 감소)
  - 마법 공격을 하면 보스 몬스터에게 20만큼의 데미지를 준다. (보스 몬스터의 HP가 20만큼 감소)
  - 마법 공격 시에는 MP 30이 소모된다.
  - 물리 공격 시에는 MP 10을 회복한다. 단, 최대치 이상의 MP는 회복할 수 없다.
- 보스 몬스터도 매 턴마다 플레이어를 공격할 수 있다.
  - 0~20 의 랜덤 데미지를 플레이어한테 입힌다.
- 공격은 플레이어가 먼저 한다.
  - 플레이어가 공격을 했을 때 보스 몬스터가 죽는다면, 보스 몬스터는 플레이어에게 피해를 입히지 못한다.
- 플레이어나 보스 몬스터의 HP가 0이 되는 경우 게임이 끝난다.
- 보스 몬스터가 죽으면 몇 턴 만에 잡았는지 출력한다.
- 플레이어가 죽으면 보스 레이드 실패 메시지를 출력한다.
- 사용자가 잘못된 값을 입력할 경우 `alert`창을 띄우고, 입력을 다시 받는다.
- 아래의 프로그래밍 실행 결과 예시와 동일하게 입력과 출력이 이루어져야 한다.

<br>

## ✍🏻 입출력 요구사항

### ⌨️ 플레이어, 보스 정보 입력

<img width="380" alt="스크린샷 2023-09-11 오후 4 51 08" src="https://github.com/baton-mission/java-boss-monster/assets/103256030/19af8705-462a-4bdd-8a90-d1c5d56d4a92">

https://github.com/baton-mission/java-boss-monster/assets/103256030/10a027e5-0990-4dad-87be-7667558d404d

### 🖥 게임 화면 출력

<img width="380" alt="스크린샷 2023-09-11 오후 4 52 18" src="https://github.com/baton-mission/java-boss-monster/assets/103256030/824363b3-f374-40ca-80a9-64bd6d8e50ed">

https://github.com/baton-mission/java-boss-monster/assets/103256030/ea485ae0-fb3f-46fb-89ca-877204cb9a37

### 게임 화면 마크업 예시

게임 화면 마크업은 자유롭게 작성해도 무관하다.
단, 레이드 성공, 실패 문구는 화면에 들어가야 한다.

```
기본 상태

   ^-^
 / 0 0 \
(   "   )
 \  -  /
  - ^ -
```

```
보스 피격시

   ^-^
 / x x \
(  `\\  )
 \  -  /
  - ^ -
```

```
레이드 실패

   ^-^
 / ^ ^ \
(   "   )
 \  3  /
  - ^ -
```

### 프로그램 실행 결과

- 레이드 성공 안내 문구

```
🎉 Dori님이 6번의 전투 끝에 보스 몬스터를 잡았습니다!! 🎉
```

- 예외 상황 시 alert를 출력해야 한다. 예외 메시지는 예외 상황에 맞도록 자유롭게 정한다.

<img width="447" alt="image" src="https://github.com/baton-mission/java-boss-monster/assets/116625502/7db9475f-fb68-4d0a-b621-b17480edd8f6">

### 💻 프로그래밍 실행 결과 예시

<details>
<summary>[레이드 성공]</summary>
<div>

- 레이드 성공 안내 문구

```
🎉 dori님이 6번의 전투 끝에 보스 몬스터를 잡았습니다!! 🎉
```

<img width="498" alt="스크린샷 2023-09-11 오후 5 29 08" src="https://github.com/woowacourse/javascript-racingcar-precourse/assets/103256030/57e35885-74bc-47c8-bf86-acd4a5ca8709">

</div>
</details>

<details>
<summary>[레이드 실패]</summary>
<div>

- 레이드 실패 안내 문구

```
dori의 HP가 0이 되었습니다.
보스 레이드에 실패했습니다. 턴: 3
```

<img width="498" alt="스크린샷 2023-09-11 오후 5 34 49" src="https://github.com/woowacourse/javascript-racingcar-precourse/assets/103256030/8dee685a-9855-4f78-9751-72ed0b82e9f7">

</div>
</details>

<br>

## 🎱 프로그래밍 요구사항

- 주어진 html 파일을 활용하여 코드를 작성한다. 임의로 id를 수정하지 않는다.
- 보스 데미지 계산에는 주어진 `random.js`를 활용한다.
- 모든 예외 발생 상황은 alert메서드를 이용하여 처리한다.
- 외부 라이브러리(jQuery, Lodash 등)를 사용하지 않고, 순수 Vanilla JS로만 구현한다.

<br>

---

## 📈 과제 진행 요구사항

- 미션은 [javascript-boss-monster](https://github.com/baton-mission/javascript-boss-monster) 저장소를 Fork/Clone해 시작한다.
- **기능을 구현하기 전에 java-boss-monster/docs/README.md 파일에 구현할 기능 목록을 정리**하시면 코드 리뷰어가 리뷰하기 더 수월합니다😄

  - 리뷰이분들도 미리 구현할 것에 대해 생각해볼 수 있기 때문에 기능 목록을 작성하지 않는 것보다 꼼꼼하고 단계적으로 코드를 작성하실 수 있을 것 같습니다.

- 미션 진행 및 제출 방법은 [바톤 미션 제출 문서](https://github.com/baton-mission/docs/blob/main/mission-guide.md) 를 참고한다.

<br>

---

## 📝 License

이 문제에 대한 저작권은 바톤에게 있습니다.
