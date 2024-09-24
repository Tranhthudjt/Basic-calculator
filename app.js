const buttons = document.querySelectorAll('.btn_item');
const display_line = document.querySelector('.type_line')
const display_his = document.querySelector('.history_input')


let array=[];
let current_num='';
let index = 0;


function calculate_array(array) {
    let calcu_array = [];
    let index = 0;
    let currentOperator = null;
    let current_result = 0;

    // Vòng lặp đầu tiên để thực hiện phép nhân và chia
    for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i])) { // Kiểm tra nếu phần tử là số
            if (currentOperator === 'x') {
                current_result *= array[i];
                currentOperator = null;
            } else if (currentOperator === '/') {
                current_result /= array[i];
                currentOperator = null;
            } else if (currentOperator === '+' || currentOperator === '-') {
                calcu_array[index++] = current_result;
                calcu_array[index++] = currentOperator;
                currentOperator = null;
                current_result = array[i]; // Gán giá trị mới cho current_result
            } else {
                current_result = array[i];
            }
        } else if (isOperator(array[i])) {
            currentOperator = array[i];
        }
    }

    // Thêm kết quả cuối cùng vào mảng
    calcu_array[index++] = current_result;

    // Reset các biến để thực hiện phép cộng và trừ
    currentOperator = null;
    current_result = 0;

    // Vòng lặp thứ hai để thực hiện phép cộng và trừ
    for (let i = 0; i < calcu_array.length; i++) {
        if (!isNaN(calcu_array[i])) { // Kiểm tra nếu phần tử là số
            if (currentOperator === '+') {
                current_result += calcu_array[i];
            } else if (currentOperator === '-') {
                current_result -= calcu_array[i];
            } else {
                current_result = calcu_array[i]; // Gán giá trị đầu tiên
            }
        } else if (isOperator(calcu_array[i])) {
            currentOperator = calcu_array[i];
        }
    }

    return current_result;
}



function isOperator(char) {
    const operators = ['+', '-', 'x', '/'];
    return operators.includes(char);
} // kiểm tra có phải là dấu không

function updateDisplay() {
    
    display_line.textContent = array.join('') + (current_num !== '' ? current_num : '');
}
// let sum = num_recent.reduce(sum_reduce);

function history_display(){
    display_his.textContent = array.join('') + (current_num !== '' ? current_num : '');
}

buttons.forEach(button => {
     button.addEventListener('click', function(){ // khi click vào nút
        const value_button = this.textContent; // lấy dữ liệu từ btn
        if(!isNaN(value_button)||value_button===','){
            if(!isNaN(value_button)){
                current_num+=value_button;
            }
            else current_num+='.';
            updateDisplay();
        } // nếu là số thì gán vào string current_num

        else if(value_button==='AC'){
            array=[];
            current_num='';
            index=0;
            display_his.innerHTML=''
            updateDisplay();
        } // reset lại các mảng

        else if (value_button === 'CE') {
            if (current_num !== '') {
                // Xóa ký tự cuối của current_num
                current_num = current_num.slice(0, -1);
            } else if (array.length > 0) {
                // Nếu array không rỗng, kiểm tra và xóa phần tử cuối
                if (typeof array[array.length - 1] === 'number') {
                    array.pop(); // Xóa số cuối cùng
                    index--;
                } else if (isOperator(array[array.length - 1])) {
                    array.pop(); // Xóa toán tử cuối cùng
                    index--;
                }
            }
            updateDisplay();
        } 
        else if(isOperator(value_button)){
            if(current_num!=''){
                array[index++]=Number(current_num);
                current_num=''
                array[index++]=value_button;
            }
            else if(index===0&&(value_button==='+'||value_button==='-')){
                current_num+=value_button;
            }
            else{
                array[--index] = value_button;
                index++;
            }
            updateDisplay();
        } // nếu là dấu thì gán 

        else if(value_button === '%') {
            if(current_num !== '') {
                    current_num = String(Number(current_num) / 100);
            }
            updateDisplay();
        }

        else if (value_button === '+/-') {
            if (current_num !== '') {
                // Đổi dấu số hiện tại
                current_num = String(-Number(current_num));
            } else if (array.length > 0 && typeof array[index - 1] === 'number') {
                // Đổi dấu số cuối cùng trong mảng
                array[index - 1] = -array[index - 1];
            }
            updateDisplay();
        } 

        else if (value_button === '=') {
            if (current_num !== '') {
                array[index++] = Number(current_num); // Thêm số cuối vào mảng trước khi tính
                current_num = '';
            }
            history_display();
            // Tính toán kết quả (cần thêm hàm tính toán cho mảng nếu muốn)
            let result = calculate_array(array);
            if(result!=Infinity&&result!=-Infinity){

                display_line.innerHTML = result;
            }
            else display_line.innerHTML = 'ngu'
            array=[result];
            index=2;
            current_num='';
        } 
     })

     button.addEventListener('mousedown',function(){ // thêm class cho html
        button.classList.add("on_press")
     })
     button.addEventListener('mouseup',function(){ // xóa class vừa thêm html
        button.classList.remove("on_press")
     })
});


