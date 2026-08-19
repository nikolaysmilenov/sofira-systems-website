import type { AiChatMessage } from "@/lib/ai/chat";
import type { ConsultantCta } from "@/lib/ai/reply";
import { userConversationText } from "@/lib/ai/qualification";

export type DiscoveryReply = {
  reply: string;
  cta?: ConsultantCta;
};

const FLEET_PATTERN =
  /автомобил|автопарк|кол(?:а|и|ата|ите)?|vehicle|fleet|koli|avtomobil|avtopark/i;
const MAINTENANCE_PATTERN =
  /профилактик|сервиз|километр|пробег|ремонт|maintenance|servis|kilometr/i;
const EXCEL_PATTERN = /excel|eksel/i;
const INVOICE_PATTERN = /фактур|invoice|faktur/i;
const AI_PATTERN = /\bai\b|изкуствен|автоматиз|avtomatiz/i;
const AUTOMATION_PATTERN = /автомат|automation|avtomatiz/i;
const SOFTWARE_PATTERN =
  /софтуер|система|програма|приложени|проект|software|programa|prilojeni|softuer|proekt/i;
const COMPANY_PATTERN = /фирма|фирмен|компания|организация|firma|firm|kompani|business|company/i;
const HIGH_INTENT_PATTERN =
  /имам конкретен проект|искам да започнем|как да започнем|искам оферта|искам да ми го направите|искам да започна|gotov[а]? sum|ready to start/i;
const COMPANY_QUESTION_PATTERN = /какво (представлява|правите|предлагате)|кои сте|sofira systems/i;

export function isVehicleDiscovery(messages: AiChatMessage[]): boolean {
  return FLEET_PATTERN.test(userConversationText(messages));
}

export function resolveSemanticDiscovery(messages: AiChatMessage[]): DiscoveryReply {
  const all = userConversationText(messages);
  const last = [...messages].reverse().find((message) => message.role === "user")?.content ?? all;

  if (HIGH_INTENT_PATTERN.test(last)) {
    return {
      reply:
        "Това вече е достатъчно конкретно, за да го обсъдим като реален софтуерен проект.\n\nИзпратете кратко запитване с основния процес, потребителите и какъв резултат търсите.",
      cta: "contact",
    };
  }

  if (FLEET_PATTERN.test(all) || MAINTENANCE_PATTERN.test(all) && /кол|автомобил|koli|avtomobil/i.test(all)) {
    return resolveFleetDiscovery(all, last);
  }

  if (INVOICE_PATTERN.test(all) && AI_PATTERN.test(all)) {
    return {
      reply:
        "Това може да се разгледа като AI + автоматизация решение по поръчка за обработка на фактури. Възможният процес е извличане на данни, проверки и преглед от човек при нужда; не е готов продукт на SOFIRA SYSTEMS.\n\nКъде получавате фактурите в момента — по имейл, като PDF файлове или през платформа?",
    };
  }

  if (EXCEL_PATTERN.test(all)) {
    return {
      reply:
        "Това е добър повод да се разгледа автоматизация или вътрешна система по поръчка. Първо бихме описали кои данни се прехвърлят между Excel файловете и къде се губи време или възникват грешки.\n\nКой процес в тези файлове се повтаря най-често?",
    };
  }

  if (AUTOMATION_PATTERN.test(all)) {
    return {
      reply:
        "Автоматизацията има смисъл, когато има повтарящ се процес, данни за прехвърляне или ръчни проверки. Това може да се оцени като решение по поръчка, а не като готов продукт.\n\nКое действие искате да се случва автоматично?",
    };
  }

  if (SOFTWARE_PATTERN.test(all)) {
    return {
      reply:
        "Да, това може да се разгледа като софтуерен проект по поръчка. Започваме от процеса и потребителите, за да преценим дали е нужна вътрешна система, автоматизация, платформа или друго решение.\n\nКакво искате програмата да прави първо?",
    };
  }

  if (COMPANY_QUESTION_PATTERN.test(last)) {
    return {
      reply:
        "SOFIRA SYSTEMS проектира и изгражда софтуер по поръчка, автоматизация, AI решения, дигитални платформи и уеб приложения. Развиваме и собствен продукт — HR HUB 360, който е в разработка.\n\nКой процес или идея искате да обсъдим?",
    };
  }

  return {
    reply:
      "Мога да помогна да го уточним като възможен софтуерен проект. Не е нужно предварително да знаете дали решението е автоматизация, AI или цяла система.\n\nКакво искате да се случва автоматично или какъв проблем искате да решите?",
  };
}

function resolveFleetDiscovery(all: string, last: string): DiscoveryReply {
  const company = COMPANY_PATTERN.test(all);
  const size = all.match(/(\d+)\s*(кол|автомобил|vehicle|koli)/i)?.[1];
  const maintenanceDetails = MAINTENANCE_PATTERN.test(last);

  if (company && size && maintenanceDetails) {
    return {
      reply:
        `Разбрах — става дума за фирмен автопарк от ${size} автомобила със следене на сервизи и километри. Това може да се разгледа като custom software проект за профилактика и управление на автопарк. Такъв проект може да включва история на ремонти, напомняния и роли за потребителите.\n\nТрябва ли системата да изпраща напомняния по пробег, по дата или и по двата критерия?`,
    };
  }

  if (company && size) {
    return {
      reply:
        `Разбрах — фирмен автопарк от ${size} автомобила. Това може да се разгледа като custom software проект за управление на автомобили и автопарк. Такъв проект може да включва сервизни интервали, пробег, ремонтна история, напомняния и роли за потребителите.\n\nКакво искате да следите първо — сервизни интервали, километри, ремонти, застраховки или друго?`,
    };
  }

  if (company) {
    return {
      reply:
        "Разбрах — става дума за фирмени автомобили. Това може да се разгледа като custom software проект за управление на автопарк, според реалния ви процес.\n\nЗа колко автомобила става дума?",
    };
  }

  return {
    reply:
      "Това може да се разгледа като custom software проект за управление на автомобили или автопарк. Такъв проект може да включва пробег, сервизни интервали, история на поддръжката, напомняния и роли за потребителите, според реалните изисквания.\n\nСтава дума за един личен автомобил или за фирмен автопарк?",
  };
}
