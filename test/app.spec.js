const BASE_URL = "../index.html";

const SELECTOR = {
  INPUT_SECTION: "#input-section",
  NAME_INPUT: "#name-input",
  BOSS_STATUS_INPUT: "#boss-status-input",
  PLAYER_STATUS_INPUT: "#player-status-input",
  START_RAID_BUTTON: "#start-raid-button",
  PLAYER_NAME: "#player-name",
  PLAYER_HP: "#player-hp",
  PLAYER_MP: "#player-mp",
  BOSS_HP: "#boss-hp",
  BOSS_SHAPE: "#boss-shape",
  PHYSICAL_ATTACK: "#physical-attack",
  MAGIC_ATTACK: "#magic-attack",
};

/* 입력값 유효성 검사 */
describe("입력 값에 대한 유효성 검사를 진행한다.", () => {
  it("플레이어의 이름은 5자 이하여야 한다.", () => {
    cy.visit(BASE_URL);

    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    const testCases = [" ", "도리토스트으"].forEach((playerName) => {
      const bossStatus = "200";
      const playerStatus = "100,100";

      cy.get(SELECTOR.NAME_INPUT).clear().type(playerName);
      cy.get(SELECTOR.BOSS_STATUS_INPUT).clear().type(bossStatus);
      cy.get(SELECTOR.PLAYER_STATUS_INPUT).clear().type(playerStatus);

      cy.get(SELECTOR.START_RAID_BUTTON)
        .click()
        .then(() => {
          expect(alertStub).to.have.been.called;
        });

      cy.reload();
    });
  });

  it("보스 몬스터 초기 HP는 100이상 300이하여야 한다.. ", () => {
    cy.visit(BASE_URL);

    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);

    ["99", "301", " ", "10as"].forEach((bossStatus) => {
      const playerName = "도리토스트";
      const playerStatus = "100,100";

      cy.get(SELECTOR.NAME_INPUT).type(playerName);
      cy.get(SELECTOR.BOSS_STATUS_INPUT).type(bossStatus);
      cy.get(SELECTOR.PLAYER_STATUS_INPUT).type(playerStatus);

      cy.get(SELECTOR.START_RAID_BUTTON)
        .click()
        .then(() => {
          expect(alertStub).to.have.been.called;
        });

      cy.reload();
    });
  });

  it("플레이어의 초기 HP와 MP의 합은 200이어야 한다. ", () => {
    cy.visit(BASE_URL);

    const alertStub = cy.stub();

    cy.on("window:alert", alertStub);

    ["1,2", "-100,300", "0,200", "a,200"].forEach((playerStatus) => {
      const playerName = "도리토스트";
      const bossStatus = "150";

      cy.get(SELECTOR.NAME_INPUT).type(playerName);
      cy.get(SELECTOR.BOSS_STATUS_INPUT).type(bossStatus);
      cy.get(SELECTOR.PLAYER_STATUS_INPUT).type(playerStatus);

      cy.get(SELECTOR.START_RAID_BUTTON)
        .click()
        .then(() => {
          expect(alertStub).to.have.been.called;
        });

      cy.reload();
    });
  });
});

/* 레이드 E2E 테스트 */
describe("보스 레이드 E2E 테스트", () => {
  before(() => {
    Cypress.Commands.add("stubRandomReturns", (returnValues = []) => {
      const randomStubs = cy.stub();

      returnValues.forEach((value, index) => {
        randomStubs.onCall(index).returns(value);
      });

      cy.visit(BASE_URL, {
        onBeforeLoad: (window) => {
          window.Math.random = randomStubs;
        },
      });
    });
  });

  /* 레이드 성공 케이스 */
  it("보스의 HP가 0이 되면 플레이어가 승리한다.", () => {
    cy.stubRandomReturns([0.05, 0.1, 0.15, 0.2, 0.25, 0.05]);

    const playerName = "도리토스";
    const bossStatus = "100";
    const playerStatus = "90,110";

    cy.get(SELECTOR.NAME_INPUT).clear().type(playerName);
    cy.get(SELECTOR.BOSS_STATUS_INPUT).clear().type(bossStatus);
    cy.get(SELECTOR.PLAYER_STATUS_INPUT).clear().type(playerStatus);
    cy.get(SELECTOR.START_RAID_BUTTON).click();

    cy.get(SELECTOR.PHYSICAL_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[89/90]");
        cy.get(SELECTOR.PLAYER_MP).contains("[110/110]");
        cy.get(SELECTOR.BOSS_HP).contains("[90/100]");
      });

    cy.get(SELECTOR.MAGIC_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[87/90]");
        cy.get(SELECTOR.PLAYER_MP).contains("[80/110]");
        cy.get(SELECTOR.BOSS_HP).contains("[70/100]");
      });

    cy.get(SELECTOR.MAGIC_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[84/90]");
        cy.get(SELECTOR.PLAYER_MP).contains("[50/110]");
        cy.get(SELECTOR.BOSS_HP).contains("[50/100]");
      });

    cy.get(SELECTOR.MAGIC_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[80/90]");
        cy.get(SELECTOR.PLAYER_MP).contains("[20/110]");
        cy.get(SELECTOR.BOSS_HP).contains("[30/100]");
      });

    cy.get(SELECTOR.PHYSICAL_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[75/90]");
        cy.get(SELECTOR.PLAYER_MP).contains("[30/110]");
        cy.get(SELECTOR.BOSS_HP).contains("[20/100]");
      });

    cy.get(SELECTOR.MAGIC_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[75/90]");
        cy.get(SELECTOR.PLAYER_MP).contains("[0/110]");
        cy.get(SELECTOR.BOSS_HP).contains("[0/100]");
      });

    cy.get(SELECTOR.BOSS_SHAPE).contains(
      `🎉 ${playerName}님이 6번의 전투 끝에 보스 몬스터를 잡았습니다!! 🎉`
    );
  });

  /* 레이드 실패 케이스 */
  it("플레이어의 HP가 0이 되면 패배한다.", () => {
    cy.stubRandomReturns([1, 1, 1]);

    const playerName = "도리토스";
    const bossStatus = "100";
    const playerStatus = "50,150";

    cy.get(SELECTOR.NAME_INPUT).clear().type(playerName);
    cy.get(SELECTOR.BOSS_STATUS_INPUT).clear().type(bossStatus);
    cy.get(SELECTOR.PLAYER_STATUS_INPUT).clear().type(playerStatus);
    cy.get(SELECTOR.START_RAID_BUTTON).click();

    cy.get(SELECTOR.PHYSICAL_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[30/50]");
        cy.get(SELECTOR.PLAYER_MP).contains("[150/150]");
        cy.get(SELECTOR.BOSS_HP).contains("[90/100]");
      });

    cy.get(SELECTOR.MAGIC_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[10/50]");
        cy.get(SELECTOR.PLAYER_MP).contains("[120/150]");
        cy.get(SELECTOR.BOSS_HP).contains("[70/100]");
      });

    cy.get(SELECTOR.MAGIC_ATTACK)
      .click()
      .then(() => {
        cy.get(SELECTOR.PLAYER_HP).contains("[0/50]");
        cy.get(SELECTOR.PLAYER_MP).contains("[90/150]");
        cy.get(SELECTOR.BOSS_HP).contains("[50/100]");
      });

    cy.get(SELECTOR.BOSS_SHAPE).contains(`${playerName}의 HP가 0이 되었습니다.`);

    cy.get(SELECTOR.BOSS_SHAPE).contains(`턴: 3`);
  });
});
