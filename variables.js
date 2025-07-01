function updateLineNumbers(textarea) {
    const container = textarea.parentElement;
    const linesDiv = container.querySelector('.code-editor__lines');
    const lines = textarea.value.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
        html += i + '<br> ';
    }
    linesDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.code-editor__textarea').forEach(updateLineNumbers);
});
