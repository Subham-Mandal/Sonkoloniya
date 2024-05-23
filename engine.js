(function() {
  const originalConsoleLog = console.log;
  const logQueue = [];
  let isDisplaying = false;

  console.log = function(...args) {
    logQueue.push(args.join(' '));
    originalConsoleLog.apply(console, args);
    if (!isDisplaying) {
      displayNextLog();
    }
  };

  function displayNextLog() {
    if (logQueue.length === 0) {
      isDisplaying = false;
      return;
    }

    isDisplaying = true;
    const message = logQueue.shift();
    const messageInput = document.getElementById('message');

    if (!messageInput) {
      console.error("The message input element doesn't exist.");
      isDisplaying = false;
      return;
    }

    messageInput.value = message;

    setTimeout(() => {
      if (logQueue.length > 0) {
        displayNextLog();
      } else {
        setTimeout(() => {
          if (logQueue.length === 0) {
            messageInput.value = '';
            isDisplaying = false;
          }
        }, 2000);
      }
    }, 2000);
  }
})();

var fullEditor, libEditor, htmlEditor, cssEditor, jsEditor;

window.onload = function() {

console.log('Welcome to Sonkoloniya !');
    // Initialize CodeMirror editors
    fullEditor = CodeMirror(document.getElementById('fulltxt'), {
        mode: 'htmlmixed',
        lineNumbers: true,
 lineWrapping: true
    });
    libEditor = CodeMirror(document.getElementById('libtxt'), {
        mode: 'xml',
        lineNumbers: true,
 lineWrapping: true
    });
    htmlEditor = CodeMirror(document.getElementById('htmltxt'), {
        mode: 'htmlmixed',
        lineNumbers: true,
 lineWrapping: true
    });
    cssEditor = CodeMirror(document.getElementById('csstxt'), {
        mode: 'css',
        lineNumbers: true,
 lineWrapping: true
    });
    jsEditor = CodeMirror(document.getElementById('jstxt'), {
        mode: 'javascript',
        lineNumbers: true,
 lineWrapping: true
    });


    // Bind event listeners to editors

    libEditor.on('change', backup);
    htmlEditor.on('change', backup);
    cssEditor.on('change', backup);
    jsEditor.on('change', backup);
fullEditor.on('change', singlebackup);

 edit('full', 'lib', 'css', 'js', 'html');

    liveActive = false;

    // Set default view
    run();


 (function() {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const consoleBar = document.getElementById('consolebar');

    console.log = function(...args) {
        originalConsoleLog.apply(console, args);
        appendToConsoleBar(args.join(' '), 'log');
        highlightCode(args);
    };

    console.error = function(...args) {
        originalConsoleError.apply(console, args);
        appendToConsoleBar(args.join(' '), 'error');
        highlightCode(args);
    };

    function appendToConsoleBar(message, type) {
        const logElement = document.createElement('div');
        logElement.textContent = message;
        logElement.classList.add('log-message');
        logElement.classList.add(type === 'error' ? 'log-error' : 'log-info');
        consoleBar.appendChild(logElement);
    }

    function highlightCode(args) {
    // Extract relevant information from the logged message
    const message = args.join(' ');
    const lineNumberMatch = message.match(/line\s*(\d+)/i);

    if (lineNumberMatch) {
        const lineNumber = parseInt(lineNumberMatch[1]);
        // Highlight the corresponding line in the HTML editor
        const lineHandle = htmlEditor.addLineClass(lineNumber - 1, 'background', 'highlighted-line');
        // Remove the highlight after a short delay (for visual feedback)
        setTimeout(() => {
            htmlEditor.removeLineClass(lineHandle, 'background', 'highlighted-line');
        }, 2000); // Adjust the delay as needed
    }
}

})();

}


function restore(){
fullEditor.setValue(localStorage.getItem('fulltxt') || '');
    libEditor.setValue(localStorage.getItem('libtxt') || '');
    htmlEditor.setValue(localStorage.getItem('htmltxt') || '');
    cssEditor.setValue(localStorage.getItem('csstxt') || '');
    jsEditor.setValue(localStorage.getItem('jstxt') || '');
}

function backup() {

let restore=document.getElementById('restore');
if(restore){
document.getElementById('restore').setAttribute('onclick', 'save()');
document.getElementById('restore').innerText='Save';
document.getElementById('restore').style.backgroundColor='blue';
document.getElementById('restore').style.color='white';
document.getElementById('restore').id='save';
}
compile();
    
    localStorage.setItem('libtxt', libEditor.getValue());
    localStorage.setItem('htmltxt', htmlEditor.getValue());
    localStorage.setItem('csstxt', cssEditor.getValue());
    localStorage.setItem('jstxt', jsEditor.getValue());

    if (liveActive) {
        run();
    }
}

function singlebackup() {

let restore=document.getElementById('restore');
if(restore){
document.getElementById('restore').setAttribute('onclick', 'save()');
document.getElementById('restore').innerText='Save';
document.getElementById('restore').style.backgroundColor='blue';
document.getElementById('restore').style.color='white';
document.getElementById('restore').id='save';
}

localStorage.setItem('fulltxt', fullEditor.getValue());

    if (liveActive) {
        run();
    }
}

let liveActive;

function live() {
    liveActive = !liveActive;
    let liveButton = document.getElementById('live');
    if (liveActive) {
        liveButton.style.color = 'white';
        liveButton.style.backgroundColor = 'red';
        liveButton.innerText = 'live *';
    } else {
        liveButton.style.color = 'white';
        liveButton.style.backgroundColor = 'green';
        liveButton.innerText = 'manual';
    }
}

function run() {
    var view = document.getElementById('view');
   let code=fullEditor.getValue();
    view.srcdoc = code;
}

function compile(){
    let libtxt = libEditor.getValue();
    let htmltxt = htmlEditor.getValue();
    let csstxt = cssEditor.getValue();
    let jstxt = jsEditor.getValue();
    let code = '<html>\n<head>\n' + libtxt + '\n<style>\n' + csstxt + '\n</style>\n</head>\n<body>\n' + htmltxt + '\n<script>\n' + jstxt + '\n<\/script>\n</body>\n</html>';
    fullEditor.setValue(code);
console.log('compiling...'+Date.now());
}



     

        function edit(a, b, c, d, e) {
            document.getElementById(a + 'txt').style.display = 'block';
            document.getElementById(b + 'txt').style.display = 'none';
            document.getElementById(c + 'txt').style.display = 'none';
            document.getElementById(d + 'txt').style.display = 'none';
            document.getElementById(e + 'txt').style.display = 'none';

            document.getElementById(a).style.color = 'red';
            document.getElementById(b).style.color = 'blue';
            document.getElementById(c).style.color = 'blue';
            document.getElementById(d).style.color = 'blue';
            document.getElementById(e).style.color = 'blue';
        }

        function changewidth(x) {
            document.getElementById('rightbar').style.width = x + '%';
            document.getElementById('leftbar').style.width = 100 - x + '%';
        }

        
function save() {
    let sessionKey = document.getElementById('sessionKey').value;
    let name;

    if (sessionKey.length < 1) {
        name = prompt('Enter File Name');
    } else {
        name = prompt('Enter File Name', sessionKey);
    }

    if (!name) {
        alert("File name cannot be empty");
        return;
    }
    name = name.trim(); // Trim the file name to remove leading and trailing spaces
    if (/\s/.test(name)) { // Check for spaces
        alert("File name cannot contain spaces");
        return;
    }

    let libtxt = libEditor.getValue();
    let htmltxt = htmlEditor.getValue();
    let csstxt = cssEditor.getValue();
    let jstxt = jsEditor.getValue();
    let fulltxt = fullEditor.getValue();

    if (name.startsWith('()')) {
        SET('sankalaniya/files/' + name + '/copy', fulltxt);
    } else {
        SET('sankalaniya/files/' + name + '/fulltxt', fulltxt);
        SET('sankalaniya/files/' + name + '/libtxt', libtxt);
        SET('sankalaniya/files/' + name + '/htmltxt', htmltxt);
        SET('sankalaniya/files/' + name + '/csstxt', csstxt);
        SET('sankalaniya/files/' + name + '/jstxt', jstxt);
    }
    alert("Files saved successfully");
}

function trigOpen(x) {
  var bottombar = document.getElementById("bottombar");
var consolebar=document.getElementById("consolebar");
  if (x.length < 1) {
    bottombar.style.transform = "translateY(100%)";
 consolebar.style.transform = "translateY(100%)";

  } else {
if(x=='.'){
 consolebar.style.transform = "translateY(0)";
    consolebar.style.height = "95%";
}
else{
   bottombar.style.transform = "translateY(0)";
    bottombar.style.height = "95%";
}
  }
}




function clearx(){

fullEditor.setValue('');
    libEditor.setValue('');
    htmlEditor.setValue('');
    cssEditor.setValue('');
    jsEditor.setValue('');
 localStorage.setItem('fulltxt', fullEditor.getValue());
 localStorage.setItem('libtxt', libEditor.getValue());
    localStorage.setItem('htmltxt', htmlEditor.getValue());
    localStorage.setItem('csstxt', cssEditor.getValue());
    localStorage.setItem('jstxt', jsEditor.getValue());
alert('Clear');

}

 
 async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }

   

    fetchData('https://onerealtimeserver-default-rtdb.firebaseio.com/SERVER/sankalaniya/files.json?shallow=true')
      .then(data => {
        const keyList = document.getElementById('keyList');
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const listItem = document.createElement('li');
            listItem.textContent = key;
            listItem.addEventListener('click', () => openCode(key));
            keyList.appendChild(listItem);
          }
        }
      })
      .catch(error => console.error('Error fetching data:', error));

function openCode(key) {
    const url = `https://onerealtimeserver-default-rtdb.firebaseio.com/SERVER/sankalaniya/files/${key}/.json`;
    const urlcopy = `https://onerealtimeserver-default-rtdb.firebaseio.com/SERVER/sankalaniya/files/${key}/copy/.json`;

    if (key.startsWith('()')) {
        document.getElementById('importx').style.display = 'none';
        document.getElementById('copy').style.display = 'block';
        fetch(urlcopy)
            .then(response => response.json())
            .then(data => {
                const jsonData = data; // If you need the entire data object
                // or specific property value like data.someProperty
                document.getElementById('openCodetxt').value = JSON.stringify(jsonData, null, 2).slice(1,-1);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
          
            });
    } else {
        document.getElementById('copy').style.display = 'none';
        document.getElementById('importx').style.display = 'block';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const jsonData = JSON.stringify(data, null, 2);
                document.getElementById('openCodetxt').value = jsonData;
                document.getElementById('sessionKey').value = key;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                
            });
    }
}


function copyCode() {
    const textArea = document.getElementById('openCodetxt');
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Code copied to clipboard');
}


function importCode() {
  let key = document.getElementById('sessionKey').value;
  console.log('Importing: ' + key);

  // Ensure that the key is valid before proceeding
  if (!key) {
    alert('Session key is required');
    return;
  }

  let database = firebase.database().ref('SERVER/sankalaniya/files/' + key);

  // Fetch csstxt
  database.child('csstxt').once("value").then(cssSnapshot => {
    let csstxt = cssSnapshot.val();
    if (csstxt !== null) {
      cssEditor.setValue(csstxt);
    } else {
      console.error('csstxt is null');
    }

    // Fetch fulltxt
    return database.child('fulltxt').once("value");
  }).then(fullSnapshot => {
    let fulltxt = fullSnapshot.val();
    if (fulltxt !== null) {
      fullEditor.setValue(fulltxt);
    } else {
      console.error('fulltxt is null');
    }

    // Fetch libtxt
    return database.child('libtxt').once("value");
  }).then(libSnapshot => {
    let libtxt = libSnapshot.val();
    if (libtxt !== null) {
      libEditor.setValue(libtxt);
    } else {
      console.error('libtxt is null');
    }

    // Fetch htmltxt
    return database.child('htmltxt').once("value");
  }).then(htmlSnapshot => {
    let htmltxt = htmlSnapshot.val();
    if (htmltxt !== null) {
      htmlEditor.setValue(htmltxt);
    } else {
      console.error('htmltxt is null');
    }

    // Fetch jstxt
    return database.child('jstxt').once("value");
  }).then(jsSnapshot => {
    let jstxt = jsSnapshot.val();
    if (jstxt !== null) {
      jsEditor.setValue(jstxt);
    } else {
      console.error('jstxt is null');
    }

    // Display success alert when all files are fetched
    console.log('All files loaded successfully!');
  }).catch(error => {
    console.error('Error fetching data:', error);

  });
}


// Add this function to your existing JavaScript code
function filterList() {
    // Declare variables
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('searchBar');
    filter = input.value.toUpperCase();
    ul = document.getElementById('keyList');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those that don't match the search query
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}




