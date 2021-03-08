
const TestAreas = [];

if (process.env.NODE_ENV !== "production") {
    TestAreas.push("_TEST1");
    TestAreas.push("_TEST2");
    TestAreas.push("_TEST3");
}


export const KnowledgeTree = {
    Name: "Default",
    Sections: [
        {
            Name: "Básico",
            Order: 1,
            Stages: [
                {
                    Code: "Seu-Eu",
                    Name: "Seu Eu",
                    KTStatKey: "SeuEu",
                    MaxValue: 2,
                    ShortDescription: "Inicie sua jornada até o futuro",
                    ShortDescriptionType: "is-success",
                    icon: "rocket",
                    route: {
                        name: "PageContent",
                        params: { IdPage: "seu-eu" },
                    },
                },
            ],
        },
        {
            Name: "Conceituação-Metas",
            Order: 2,
            Stages: [
                {
                    Code: "Suas-Habilidades",
                    Name: "Suas Habilidades Básicas",
                    KTStatKey: "Habilidades",

                    MaxValue: 3,

                    ShortDescription: "Habilidades que quer investir",
                    ShortDescriptionType: "is-default",

                    KTStatLockKey: "SeuEu",
                    unlockMinValueCondition: 2,
                    canPayToUnlock: false,
                    UnlockPrice: 9.99,
                    LockedShortDescription: "Conclua as seções anteriores",


                    icon: "bike",
                    route: {
                        name: "PageContent",
                        params: { IdPage: "-MPff05IKbpSjpOPFwDV" },
                    },
                },
                {
                    Code: "Seus-Primeiro-Pedido",
                    Name: "Seu Primeiro Pedido",
                    ShortDescription: "Peça um Feedback para nossos experts",
                    ShortDescriptionType: "is-info",
                    icon: "food",
                    route: {
                        name: "SkillFeedback",
                        params: { IdPage: "-MPff05IKbpSjpOPFwDV" },
                    },
                },
            ],
        },
        {
            Name: "Planejamento",
            Order: 3,
            Stages: [
                {
                    Code: "Seus-OKRs-1",
                    Name: "Seus OKRs",
                    ShortDescription: "Objetivos e Resultados-Chave Parte I",
                    ShortDescriptionType: "is-info",
                    icon: "target",
                    route: {
                        name: "PageContent",
                        params: { IdPage: "-MPff05IKbpSjpOPFwDV" },
                    },
                }, {
                    Code: "Seu-PlanoNegocios",
                    Name: "Seu Plano de Negócios",
                    ShortDescription: "Planeje-se como uma empresa",
                    ShortDescriptionType: "is-primary",
                    icon: "store",
                    route: {
                        name: "PageContent",
                        params: { IdPage: "-MPff05IKbpSjpOPFwDV" },
                    },
                },
            ],
        },
        {
            Name: "MasterClass",
            Order: 4,
            Stages: [
                {
                    Code: "MasterClass-1",
                    Name: "Master Class 1",
                    style: "background-color: AliceBlue",
                    KTStatKey: "Req1",
                    KTStatLockKey: "Req1",
                    MaxValue :32,
                    unlockMinValueCondition: 40,
                    canPayToUnlock: true,
                    UnlockPrice: 9.99,
                    isSpecial: true,
                    LockedShortDescription: "Conclua as seções anteriores",
                    ShortDescription: "Assista a uma aula especial",
                    ShortDescriptionType: "is-primary",
                    icon: "school",
                    route: {
                        name: "PageContent",
                        params: { IdPage: "-MPff05IKbpSjpOPFwDV" },
                    },
                },
            ],
        },  {
            Name: "MasterClass-2",
            Order: 4,
            Stages: [
                {
                    Code: "MasterClass-1",
                    Name: "Master Class 1",
                    style: "background-color: AliceBlue",
                    KTStatKey: "Req1",
                    KTStatLockKey: "Req1",
                    MaxValue :32,
                    unlockMinValueCondition: 40,
                    canPayToUnlock: true,
                    UnlockPrice: 9.99,
                    isSpecial: true,
                    LockedShortDescription: "Conclua as seções anteriores",
                    ShortDescription: "Assista a uma aula especial",
                    ShortDescriptionType: "is-primary",
                    icon: "school",
                    route: {
                        name: "PageContent",
                        params: { IdPage: "-MPff05IKbpSjpOPFwDV" },
                    },
                },
            ],
        },
        //   {
        //     Name: "TEst",
        //     Order: 4,
        //     Stages: [
        //       {
        //         Code: "MasterClass-1",
        //         Name: "Master Class 1",
        //         style: "background-color: AliceBlue",
        //         KTStatKey: "Req1",
        //         unlockMinValueCondition: 40,
        //         canPayToUnlock: false,
        //         UnlockPrice: 9.99,
        //         isSpecial: true,
        //         LockedShortDescription: "Conclua as seções anteriores",
        //         ShortDescription: "Assista a uma aula especial",
        //         ShortDescriptionType: "is-primary",
        //         icon: "school",
        //         route: {
        //           name: "PageContent",
        //           params: { IdPage: "-MPff05IKbpSjpOPFwDV" },
        //         },
        //       },
        //     ],
        //   },
    ],
}

export default KnowledgeTree

