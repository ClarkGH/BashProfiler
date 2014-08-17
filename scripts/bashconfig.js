function bashconfig(){
    this.aliases = {
        "..": "cd .."
        ".2": ".2(){ cd \"../../$1\" }",
        ".3": ".3(){ cd \"../../../$1\" }",
        ".4": ".4(){ cd \"../../../../$1\" }",
        "lsdir": "ls -d */",
        "mkcd": "mkcd () { mkdir -p \"$1\" && cd \"$1\"; }"
    }
}