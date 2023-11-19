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
      UA: `Заявка в обробці.Дякуємо, що зробили замовлення в нашому магазині.`,
    },
    err: {
      EN: `Error sending.`,
      UA: `Помилка при відправці.`,
    },
  },
  SignUp: {
    suc: {
      EN: `Registration completed successfully.
      Sign in to your account.`,
      UA: `Реєстрацію успішно завершено. Увійдіть у свій обліковий запис.`,
    },
    err: {
      EN: 'Error during registration.',
      UA: 'Помилка при реєстрації.',
    },
  },
  SendForm: {
    suc: {
      EN: 'The application is successful. Our consultant will contact you soon.',
      UA: "Заявка успішна. Наш консультант зв'яжеться з вами найближчим часом.",
    },
    err: {
      EN: 'Error sending data.',
      UA: 'Помилка при надсиланні данних.',
    },
  },
  SignIn: {
    suc: {},
    err: {
      EN: 'An error occurred when entering the personal account.',
      UA: 'Помилка при вході в  особистий кабінет.',
    },
  },
}
