ATOM

Commands:

Export all installed packages to a script.
```
apm list --installed --bare > ./packages.atom
```

Install all packages from the file.
```
apm install --packages-file ./packages.atom
```
