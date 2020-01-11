
// Task 10 ============================================
/*  Проект. Дана переменная card - корзина. Добавьте кнопку b-10 и функцию t10, которые сохраняют card в LS.*/
let out_10 = document.querySelector(".out-10");
let b_10 = document.querySelector(".b-10");
let str_10 = "";
const card = {
    'apple': 3,
    'grape': 2,
    'berries': 14
}

function t10() {


    localStorage.setItem("card", JSON.stringify(card));
    out_10.innerHTML = "Корзина не пуста";
    t11();

}

b_10.onclick = function () {

    b_10.disabled = true;
    t10();


}
// Task 11 ============================================
/*  Создайте фукнцию t11 которая читает корзину из LS и выводит на страницу в виде таблицы. Формат -  название товара - количество. Функция должна вызываться всегда после перезаписи LS ( в данном случае - просто добавьте ее вызов в нужные функции). */

function t11() {

    str_10 = "<table><tr><th>Фрукт</th><th>Количество</th></tr>";
    let card = JSON.parse(localStorage.getItem("card"));
    let step = 0;
    let summ = 0;
    for (let key in card) {

        str_10 += `<tr><td>${key}</td><td data-fruit=${key} data-count=${step}>${card[key]}</td><td><button data-btn=${step} class='btn-plus'>+</td><td><button data-btn=${step} class='btn-minus'>-</td></tr>`;
        step++;
        summ += card[key];

    }

    str_10 += "</table>";
    str_10 += `<div class='summ'>Общее количество товаров: <span>${summ}</span></div>`;
    out_10.innerHTML = str_10;
    t12();

}

// ваше событие здесь!!!

// Task 12 ============================================
/*  Добавьте в таблицу кнопки плюс и минус возле каждого товара. При нажатии кнопки - изменяйте количество товаров в card, обновляйте LS, выводите на страницу. */

function t12() {

    let btn_plus = document.querySelectorAll(".btn-plus");
    let btn_minus = document.querySelectorAll(".btn-minus");
    let count_fruits = document.querySelectorAll("td[data-count]");

    let itog = document.querySelector(".summ span");
    //Перебор кнопок увеличения товара
    for (let i = 0; i < btn_plus.length; i++) {

        btn_plus[i].onclick = function () {

            for (let k = 0; k < count_fruits.length; k++) {

                if (this.dataset.btn == count_fruits[k].dataset.count) {

                    let num = +count_fruits[k].innerHTML;
                    let fruit = count_fruits[k].dataset.fruit;
                    let card = JSON.parse(localStorage.getItem("card"));

                    for (let key in card) {

                        if (key == fruit && num == card[key]) {

                            card[key]++;
                            console.log(card);

                        }

                    }

                    num++;
                    count_fruits[k].innerHTML = num;
                    localStorage.setItem("card", JSON.stringify(card));
                    itog.innerHTML = t13();

                }

            }

        }

    }

    for (let i = 0; i < btn_minus.length; i++) {

        btn_minus[i].onclick = function () {

            for (let k = 0; k < count_fruits.length; k++) {

                if (this.dataset.btn == count_fruits[k].dataset.count) {

                    let num = +count_fruits[k].innerHTML;
                    let fruit = count_fruits[k].dataset.fruit;
                    let card = JSON.parse(localStorage.getItem("card"));

                    for (let key in card) {

                        if (key == fruit && num == card[key]) {

                            card[key]--;
                            if (card[key] < 0) {

                                card[key] = 0;

                            }

                        }

                    }

                    num--;
                    if (num < 0) {

                        num = 0;

                    }
                    count_fruits[k].innerHTML = num;
                    localStorage.setItem("card", JSON.stringify(card));
                    itog.innerHTML = t13();

                }

            }

        }

    }



}


// Task 13 ============================================
/*  Добавьте в таблицу footer который считает общее количество товара. */

function t13() {

    let summ = 0;
    for (let key in JSON.parse(localStorage.getItem("card"))) {

        summ += JSON.parse(localStorage.getItem("card"))[key];

    }

    return summ;


}

// Task 14 ============================================
/*  Добавьте функцию t13, которая при загрузке страницы проверяет наличие card в LS и если есть -выводит его на страницу. Если нет - пишет корзина пуста. */

function t14() {

    if (localStorage.getItem("card") == null) {

        out_10.innerHTML = "Корзина пуста";

    } else {

        out_10.innerHTML = "Корзина не пуста";
        b_10.disabled = true;
        t11();

    }

}

window.onload = function () {

    t14();

}