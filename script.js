let pyodideReadyPromise = loadPyodide();
async function runCode(inputId, outputId) {
    const code = document.getElementById(inputId).value;
    const outputDiv = document.getElementById(outputId);
    outputDiv.innerHTML = '<span style="color:gray">Выполнение...</span>';
    const pyodide = await pyodideReadyPromise;
    try {
        let encoded = btoa(unescape(encodeURIComponent(code)));
        let result = await pyodide.runPythonAsync(`
import sys
from io import StringIO
import traceback
import base64
sys.stdout = sys.stderr = mystdout = StringIO()
try:
    code = base64.b64decode("${encoded}").decode("utf-8")
    exec(code)
except Exception:
    traceback.print_exc()
mystdout.getvalue()
        `);
        outputDiv.innerHTML = result.replace(/\n/g, '<br>');
    } catch (err) {
        outputDiv.innerHTML = '<span style="color:red">' + err + '</span>';
    }
}
