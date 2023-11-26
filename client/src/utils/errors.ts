type T = {
  [key: string]: {
    [key: string]: {
      [key: string]: string
    }
  }
}

export const informs: T = {
  submitCart: {
    suc: {
      EN: `The application is being processed. Thank you for placing an order in our store.`,
      УКР: `Заявка в обробці.Дякуємо, що зробили замовлення в нашому магазині.`,
    },
    err: {
      EN: `Error sending.`,
      УКР: `Помилка при відправці.`,
    },
  },
  SignUp: {
    suc: {
      EN: `Registration completed successfully.
      Sign in to your account.`,
      УКР: `Реєстрацію успішно завершено. Увійдіть у свій обліковий запис.`,
    },
    err: {
      EN: 'Error during registration.',
      УКР: 'Помилка при реєстрації.',
    },

    longPassword: {
      EN: 'Password is too long. Password must contain between 8 and 25 characters.',
      УКР: 'Занадто довгий пароль.Пароль має містити від 8 до 25 символів.',
    },
  },
  SendForm: {
    suc: {
      EN: 'The application is successful. Our consultant will contact you soon.',
      УКР: "Заявка успішна. Наш консультант зв'яжеться з вами найближчим часом.",
    },
    err: {
      EN: 'Error sending data.',
      УКР: 'Помилка при надсиланні данних.',
    },
    incorrectPassword: {
      EN: 'Incorrect format of number.',
      УКР: 'Не коректний формат номеру.',
    },
    incorrectName: {
      EN: 'Name cannot be empty. And must contain only letters.',
      УКР: "Ім'я не може бути пустим. І має містити тільки літери.",
    },
  },
  SignIn: {
    suc: {},
    err: {
      EN: 'An error occurred when entering the personal account.',
      УКР: 'Помилка при вході в  особистий кабінет.',
    },
    paswordNotification: {
      EN: 'The password must contain at least one digit, one uppercase letter, and be at least 8 characters long. It may contain no more than one special character.',
      УКР: 'Пароль повинен містити принаймні одну цифру, одну велику літеру і складатися з принаймні 8 символів. Може містити не більше одного спеціального символу.',
    },
    emailNotification: {
      EN: 'Please enter an email address in the format provided in the field as an example.',
      УКР: 'Будь ласка, введіть адресу електронної пошти у форматі, який наведено у полі як приклад.',
    },
  },
}
