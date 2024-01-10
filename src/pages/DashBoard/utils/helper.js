export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
  
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    return color;
  }

  export  function generateLast6MonthsNames() {
    const monthNames = [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ];
  
    const currentDate = new Date();
    const months = [];
  
    for (let i = 0; i < 6; i++) {
      const currentMonth = currentDate.getMonth() - i;
      const newDate = new Date(currentDate);
      newDate.setMonth(currentMonth);
  
      const monthName = monthNames[newDate.getMonth()];
      months.push(monthName);
    }
  
    return months.reverse();;
  }

export function getLastCharacter(str) {
  // Kiểm tra xem chuỗi có rỗng không
  if (str.length === 0) {
    return null; // hoặc bất kỳ giá trị mặc định nếu muốn
  }

  // Lấy chữ cái cuối cùng của chuỗi
  const lastCharacter = str.charAt(str.length - 1);
  return lastCharacter;
}

export function getMonthNumberFromString(monthString) {
  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const monthIndex = monthNames.findIndex((month) => month === monthString);
  
  // Nếu không tìm thấy, hoặc nếu bạn muốn tháng bắt đầu từ 1 thay vì từ 0, thì có thể sử dụng (monthIndex + 1)
  return monthIndex !== -1 ? monthIndex + 1 : null;
}


export function findObjectInArray(arr, field ,value){
  if(!arr) return {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][field] == value) {
      return arr[i];
    }
  }
  return {};
}


  