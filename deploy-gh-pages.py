import subprocess
import os
import shutil

print("🚀 Building and deploying to gh-pages...")
wt_dir = '/tmp/galsa-gh-pages'
if os.path.exists(wt_dir):
    shutil.rmtree(wt_dir)

subprocess.run(['git', 'worktree', 'add', '-B', 'gh-pages', wt_dir], check=True)

for item in os.listdir(wt_dir):
    if item != '.git':
        p = os.path.join(wt_dir, item)
        if os.path.isdir(p):
            shutil.rmtree(p)
        else:
            os.remove(p)

for item in os.listdir('dist'):
    s = os.path.join('dist', item)
    d = os.path.join(wt_dir, item)
    if os.path.isdir(s):
        shutil.copytree(s, d)
    else:
        shutil.copy2(s, d)

subprocess.run(['git', '-C', wt_dir, 'add', '-A'], check=True)
subprocess.run(['git', '-C', wt_dir, 'commit', '-m', 'Deploy production build to GitHub Pages'], check=True)
subprocess.run(['git', '-C', wt_dir, 'push', '-u', 'origin', 'gh-pages', '--force'], check=True)
subprocess.run(['git', 'worktree', 'remove', '--force', wt_dir], check=True)

print("✅ Despliegue completado con éxito en GitHub Pages!")
