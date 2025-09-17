Setup and run

```powershell
cd sih-code
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

# start API (FastAPI)
uvicorn app:app --reload --port 8000
```

If you get an execution policy error in PowerShell when activating venv:
```powershell
Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Command-line demo remains available:
```powershell
python run_demo.py
```
