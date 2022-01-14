const input_array = document.getElementById('array');
const output_array = document.getElementById('output-array');
const output_algo = document.getElementById('output-algo');
const algo_box = document.getElementById('algo');
const running_info = document.getElementById('running-info');

const style = document.styleSheets[0];
const swapDuration = 2;
const maxSize = 20;
updateArray();

const output = document.querySelector('.output');

let img = document.createElement('img');
img.setAttribute('class','arrow');
img.setAttribute('src','arrow.png');

let arrow = document.createElement('div');
arrow.setAttribute('class','arrow-box');
arrow.appendChild(document.createElement('p'));
arrow.appendChild(img);

let arrow1 = arrow.cloneNode(true);
let arrow2 = arrow.cloneNode(true);

arrow2.style.filter = 'hue-rotate(180deg)';

let box = document.createElement('div');
box.setAttribute('class','box');

box.appendChild(document.createTextNode(""));

let limiLine = document.createElement('div');
limiLine.style.width = '4px';
limiLine.style.height = '120px';
limiLine.style.position = 'absolute';
limiLine.style.transform = 'translateY(-20px)';
limiLine.style.transition = 'all 0.5s ease-in-out';
limiLine.style.left = '0';
limiLine.style.backgroundColor = "rgba(20, 123, 220, 0.4)";

const btn = document.querySelector('.bubble-sort-btn');

btn.addEventListener('click',bubbleSort);

let arr = [];

let colors = [];
setColors();

function updateArray()
{
    setTimeout(() => {  
        let arrText = input_array.value;
        arrText.trim();
        arr = arrText.split(/[ ,]+/).filter(Boolean).map(Number);
        arr = getNumbers(arr);
        output_array.appendChild(output);
    },
    1000);
}
function getNumbers(arr)
{
    var myarr = []
    output.innerHTML = ""
    for(let i=0;i<Math.min(maxSize,arr.length);i++)
    {
        if(!isNaN(arr[i]))
        {
            myarr.push(arr[i]);
            let b = box.cloneNode(true);
            b.setAttribute('id',i);
            b.textContent = arr[i];
            b.style.backgroundColor = colors[i];
            output.appendChild(b);
        }
        else
        {
            console.log("found characters !!");
        }
    }
    return myarr;
}
function setColors()
{
    for(let i=0;i<maxSize;i++)
    {
        colors[i] = '#'+(0x1000000+(Math.random() + i)*0xffffff).toString(16).substr(1,6);
    }
    // colors = ["#004d98","#ff3f10","#00f4ff","#ff2ac1","#74b032","#ff88ff","#98b200","#003490","#4e8300","#0094ec","#b6002f","#5dbe84","#ff6867","#003000","#ff9aae","#004982","#bce8ff","#434247","#909bbb","#005073"];
}

function bubbleSort()
{

    btn.disabled = 'true';
    algo_box.appendChild(arrow1);
    algo_box.appendChild(arrow2);
    algo_box.appendChild(limiLine);

    console.log('doing bubble sort');
    let array = output.cloneNode(true);
    if(!output_algo.hasChildNodes())
        output_algo.appendChild(array);
    if(!output_algo.childNodes[0].isSameNode(array))
    {
        output_algo.innerHTML = "";
        output_algo.appendChild(array);
    }
    if(output_algo.hasChildNodes)
        doBubbleSort(output_algo.childNodes[0]);
}
async function doBubbleSort(out)
{
    arrow1.firstChild.innerHTML = 'j';
    arrow2.firstChild.textContent = "j+1";

    nodes = out.childNodes;
    let size = nodes.length;
    let swapcounter = 0;
    for(let i=0;i<size;i++)
    {
        let flag = false;
        limiLine.style.left = nodes[size-1-i].offsetLeft+nodes[size-1-i].offsetWidth+'px';
        for(let j=0;j<size-1-i;j++)
        {
            running_info.innerHTML = `j = ${j} < ${size-1-i}
                                        <br>
                                        for i = ${i} , j < ${size-1} - i`;

            arrow1.style.left = nodes[j].offsetLeft+(nodes[j].offsetWidth)/2-5 + 'px';
            arrow2.style.left = nodes[j+1].offsetLeft+(nodes[j+1].offsetWidth)/2-5 + 'px';
            // console.log(nodes[j].textContent);
            if(Number(nodes[j].textContent) > Number(nodes[j+1].textContent))
            {
                //
                flag = true;
                updateRunningInfo(nodes,i,j,size,true);
                swapNode(nodes[j],nodes[j+1]);
                swapcounter++;
            }
            else
            {
                updateRunningInfo(nodes,i,j,size,false);
            }
            await sleep(swapDuration*1000);
        }
        if(flag == false)
        {
           break;
        }
    }
    btn.disabled=false;
    running_info.innerHTML = `Array is Sorted now !!<br> 
                              Total Swaps Performed : ${swapcounter} :)`;
    out.style.backgroundColor = 'rgba(20, 220, 30, 0.5)';
}



function updateRunningInfo(nodes,i,j,size,isSwap)
{
    let text =     
    `
    j = ${j} < ${size-1-i}
    <br>
    `;
    if(isSwap)
    {
        text = text + `<br>Swap Performed as ${nodes[j].textContent} > ${nodes[j+1].textContent}`;
    }
    else
    {
        text = text + '<br>No Swap Performed'; 
    }
    running_info.innerHTML = text;
}

function swapNode(node1,node2)
{
    // console.log(node1);
    animateSwap(node1,node2);
    setTimeout(() => {
        node1.style.animation = "";
        node2.style.animation = "";
        var clonedNode1 = node1.cloneNode(true);
        var clonedNode2 = node2.cloneNode(true);
        node1.parentNode.replaceChild(clonedNode2,node1);
        node2.parentNode.replaceChild(clonedNode1,node2);
    },swapDuration*1000);
}

function animateSwap(node1,node2)
{
    style.insertRule(
        `
            @keyframes anim
            {
                50% {filter : brightness(150%) contrast(150%); color : black; transform: translateY(10px); border-radius : 10px; }
                90% { color : white; } 
                100% { filter : brightness(100%) contrast(100%);}
            }
        `
    );

    node1.style.animation = `anim ${swapDuration}s ease-in-out`;
    node2.style.animation = `anim ${swapDuration}s ease-in-out`;
}



// function animateSwap(node1,node2)
// {
//     // console.log(node1.id+" "+ node1.offsetLeft);
//     // console.log(node2.id+" "+ node2.offsetLeft);
//     var move = node2.offsetLeft - node1.offsetLeft;
//     // console.log(move);
//     var yd = 60;
    // style.insertRule(
    //     `
    //         @keyframes anim${node1.id}
    //         {
    //             0% { transform: translateX(0) translateY(0); } 
    //             50% { transform: translateX(${move/2}px) translateY(${yd}px); } 
    //             80% { transform: translateX(${move}px) translateY(0px);}
    //             100% { transform: translateX(${move}px) translateY(0px);}
    //         }
    //     `
    // );

    // style.insertRule(
    //     `
    //         @keyframes anim${node2.id}
    //         {
    //             0% { transform: translateX(0) translateY(0); } 
    //             50% { transform: translateX(${-move/2}px) translateY(${yd}px); } 
    //             80% { transform: translateX(${-move}px) translateY(0px);}
    //             100% { transform: translateX(${-move}px) translateY(0px);}
    //         }
    //     `
    // );
    // node1.style.animation = `anim${node1.id} ${swapDuration}s ease-in-out`;
    // node2.style.animation = `anim${node2.id} ${swapDuration}s ease-in-out`;
// }


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 