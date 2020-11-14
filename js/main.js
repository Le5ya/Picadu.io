    // Your web app's Firebase configuration
     firebaseConfig = {
      apiKey: "AIzaSyBjQp0SUifpeTvX4PwTvlVDf_L4sBHudY8",
      authDomain: "pikadu-b3036.firebaseapp.com",
      databaseURL: "https://pikadu-b3036.firebaseio.com",
      projectId: "pikadu-b3036",
      storageBucket: "pikadu-b3036.appspot.com",
      messagingSenderId: "1091617022783",
      appId: "1:1091617022783:web:3ad1eefc7eb299b288698a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase);
// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const listUsers = [
  {
    email:'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS'
  },
  {
    email:'kate@mail.com',
    password: '123456',
    displayName: 'KateJS'
  },
];

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user;
      } else {
       this.user = null; 
    }
    if(handler) handler();
    })

  },
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
       alert ('email is invalid');
       return;
  }
  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
          if (errCode ==='auth/wrong-password') {
            console.log(errMessage);
            alert('Неверный пароль')

          } else if (errCode = 'auth/user-not-found') {
            console.log(errMessage);
            alert('Пользователь не найден')
          } else {
            alert(errMessage)
          }
          console.log(err);
  })

  
    // const user = this.getUser(email);
    // if(user && user.password === password) {
    //   this.authorizedUser(user)
    //   handler();
    // } else {
    //   alert ('Почта или пароль указаны неверно')
    // }
  },
  logOut(handler) {
    rirebase.auth().signOut()

    // if (handler) {
    //   handler(); 
    // }
   
  },
  signUp(email, password, handler) {
      if(!regExpValidEmail.test(email)) {
      alert ('email is invalid');
      return;
      }
    if (!email.trim() || !password.trim()) {
      alert('Введите данные')
      return;
    }

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.editUser(email.substring(0, email.index0f('@')), nul, handler)
      })
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;
          if (errCode ==='auth/weak-password') {
            console.log(errMessage);
            alert('Слабый пароль')

          } else if (errCode = 'auth/email-already-in-use') {
            console.log(errMessage);
            alert('Этот парольуже используется')
          } else {
            alert(errMessage)
          }
          console.log(err);

      });
      
      

    // if(!this.getUser(email))  {
    //   const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
    //   listUsers.push(user)
    //   this.authorizedUser(user)
    //   handler();
    // } else {
    //   alert('Пользователь с таким email уже зарегистрирован')
    // }
  },
  editUser(userName, photoURL, handler ) {
      const user = firebase.auth().currentUser;
      if (userName) {
        // this.user.displayName = userName;
      if (userPhoto) {
        user.updateProfile({
          displayName,
          photoURL
        })
        // this.user.photo = userPhoto;
      } else {
          user.updateProfile({
            displayName
        }).then(handler)
      }
    }
      // handler();
  },
  // getUser(email) {
  //   return listUsers.find(item => item.email === email)
  // },
  // authorizedUser(user) {
  //   this.user = user;
  // }
  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Письмо отправлено')
      })
      .catch(err => {
        console.log(err);
      })
  }
};
const loginForget = document.querySelector('.login-forget');

loginForget.addEventListener('click', event => {
  event.preventDefault();

  setUser.sendForget(emailInput.value);
  emailInput.value = '';
})

const setPosts = {
  allPosts: [
    // {
    //   title: 'Заголовок поста',
    //   text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ебукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство чтовопроса ведущими о решила одна алфавит!',
    //   tags: ['свежее', 'новое','горячее','мое','случайность'],
    //   author: {displayName: 'maks', photo:'https://i.pinimg.com/originals/50/8f/24/508f24061a790115cbf26b9624771e20.jpg'},
    //   date: '11.11.20, 20:54:00',
    //   like: 15,
    //   comments: 20,
    // },
    // {
    //   title: 'Заголовок поста2',
    //   text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ебукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство чтовопроса ведущими о решила одна алфавит!',
    //   tags: ['свежее', 'новое','мое','случайность'],
    //   author: {displayName: 'kate', photo: 'https://it-doc.info/wp-content/uploads/2019/06/avatarka_dlya_devushki_.jpg'},
    //   date: '11.11.20, 20:54:00',
    //   like: 45,
    //   comments: 12,
    // },
    // {
    //   title: 'Заголовок поста3',
    //   text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рмаленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ебукв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство чтовопроса ведущими о решила одна алфавит!',
    //   tags: ['свежее', 'новое','горячее','мое','случайность'],
    //   author: {displayName: 'nik', photo: 'https://images.plurk.com/ykb0-2RnfLnD6za03elgSx8APVc.jpg'},
    //   date: '11.11.20, 20:54:00',
    //   like: 15,
    //   comments: 20,
    // },
  ],
  addPost(title, text, tags, handler) {

    const user =firebase.auth().currentUser;

    this.allPosts.unshift ({
      id: `postID${(+new Date().toString(16))}-${user.uid}`,
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photoURL: setUsers.user.photoURL, 
      },
      date: new Date().toLocaleString(), 
      like: 0,
      comments: 0,
    })
    firebase.database().ref('post').set(this.allPosts)
      .then(() => this.getPosts(handler))

    // if (handler) {
    //   handler();
    // }
  },
  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })
  }
};


const toggleAuthDom = () => {
  const user = setUsers.user;
  // console.log('user:', user);

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL ? user.photoURL : userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible'); 
    postsWrapper.classList.add('visible');
  }
};
const showAddPost =() =>{
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPosts.forEach(post => {
    const { title, text, date, tags, like, comments, author } = post;

    postsHTML += `
          <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text} </p>
          <div class="tags">
            ${tags.map(tag =>`<a href="#" class="tag">#${tag}</a>`)}
          </div>
          <!-- /.tags -->
        </div>
        <!-- /.post-body -->
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <!-- /.post-buttons -->
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo ||"img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
          </div>
          <!-- /.post-author -->
        </div>
        <!-- /.post-footer -->
      </section>
    `;

  })

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');

  postsWrapper.innerHTML = postsHTML;
};

const init = () => {
  loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
  loginForm.reset();
});
loginSignup.addEventListener('click', event => {
  event.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
  loginForm.reset();
});
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
});

editElem.addEventListener('click', event => {
  event.preventDefault();
  editContainer.classList.toggle('visible');
  editUsername.value = setUser.user.displayName;
});

editContainer.addEventListener('submit', event => {
  event.preventDefault();
  setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
  editContainer.classList.remove('visible');
})

// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})
buttonNewPost.addEventListener('click', event => {
  event.preventDefault();
  showAddPost();
});

addPostElem.addEventListener('submit', event => {
  event.preventDefault();
  const { title, text, tags } = addPostElem.elements;
  console.log(title, text. tags);

  if(title.value.lenght < 6) {
    alert('Слишком короткий заголовок');
    return;
  }
  if(text.value.lenght < 50) {
    alert('Слишком короткий пост');
    return;
  }
  setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

  addPostElem.classList.remove('visibe');
  addPostElem.reset();  
});

  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts);
  // toggleAuthDom();
}
document.addEventListener('DOMContentLoaded', init)



