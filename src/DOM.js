import { createElement } from 'react';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    const body = document.querySelector('body');
    let res = document.createElement(tag);
    res.textContent = content;
    for (let i = 1; i <= count; i++) {
        let resClone = res.cloneNode(true);
        body.append(resClone);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    let res = document.createElement('div');
    res.classList.add('item_' + 1);

    let makeChildrens = function (div, lvl) {
        for (let i = 1; i <= childrenCount; i++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('item_' + lvl);
            if (lvl < level) {
                makeChildrens(newDiv, lvl + 1);
            }
            div.append(newDiv);
        }
    };
    makeChildrens(res, 2);
    return res;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    function replaceTag(element, newTag) {
        let elementNew = document.createElement(newTag);
        elementNew.innerHTML = element.innerHTML;

        Array.prototype.forEach.call(element.attributes, function (attr) {
            elementNew.setAttribute(attr.name, attr.value);
        });

        element.parentNode.insertBefore(elementNew, element);
        element.parentNode.removeChild(element);
    }

    let res = generateTree(2, 3);
    let arr = res.querySelectorAll('.item_2');
    for (let i = 0; i < arr.length; i++) {
        replaceTag(arr[i], 'SECTION');
    }
    return res;
}
