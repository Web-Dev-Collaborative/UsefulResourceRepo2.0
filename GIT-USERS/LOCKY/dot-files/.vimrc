" Vundle
set nocompatible             " not compatible with the old-fashion vi mode
filetype off                 " required!

" from http://blog.chh.tw/posts/vim-vundle/
let iCanHazVundle=1
let vundle_readme=expand('~/.vim/bundle/vundle/README.md')

" http://www.erikzaadi.com/2012/03/19/auto-installing-vundle-from-your-vimrc/
" Setting up Vundle - the vim plugin bundler
if !filereadable(vundle_readme)
  echo "Installing Vundle.."
  echo ""
  silent !mkdir -p ~/.vim/bundle
  silent !git clone https://github.com/gmarik/vundle ~/.vim/bundle/vundle
  let iCanHazVundle=0
endif
" from http://blog.chh.tw/posts/vim-vundle/

" Let Vundle manage Vundle
" required!
set rtp+=~/.vim/bundle/vundle/
call vundle#rc()
Bundle 'gmarik/vundle'

Bundle 'L9'
Bundle 'rstacruz/sparkup', {'rtp': 'vim/'}

" Custom Bundle
Bundle 'Lokaltog/vim-easymotion'
Bundle 'Lokaltog/vim-powerline'
Bundle 'airblade/vim-gitgutter'
Bundle "MarcWeber/vim-addon-mw-utils"
Bundle "tomtom/tlib_vim"
Bundle 'Townk/vim-autoclose'
Bundle 'kien/ctrlp.vim'
Bundle 'majutsushi/tagbar'
Bundle 'tomtom/tcomment_vim'
" Git Plugin
Bundle 'tpope/vim-fugitive'
Bundle 'honza/vim-snippets'
Bundle 'garbas/vim-snipmate'

" ====== For python dev ======
Bundle 'davidhalter/jedi-vim'
" Python syntax, indent check
"Bundle 'hynek/vim-python-pep8-indent'
" Supertab is a vim plugin which allows you to use <Tab> for all your insert completion needs
Bundle 'ervandew/supertab'
"Bundle 'kevinw/pyflakes-vim'
"Bundle 'scrooloose/syntastic'
"Bundle 'fisadev/vim-isort'
Bundle 'Shougo/neocomplcache.vim'

Bundle 'yann2192/vim-colorschemes'
Bundle 'yann2192/vim-vitamins'

Bundle 'scrooloose/nerdtree'
Bundle 'jistr/vim-nerdtree-tabs'
Bundle 'klen/python-mode'
Bundle 'rkulla/pydiction'

" ===== For JS Dev =========
Bundle 'pangloss/vim-javascript'
Bundle 'othree/html5.vim'
Bundle 'hail2u/vim-css3-syntax'
"Bundle 'othree/vim-javascript-syntax'
Bundle 'mattn/emmet-vim'
Bundle 'gregsexton/MatchTag'
call vundle#end()

"General Vim Setting
filetype plugin indent on    " enable filetype-specific plugins
set history=50               " keep 50 lines of command line history
set number                   " enable line numbers
set autoindent               " enable autoindent
set expandtab                " use space instead of tab
set tabstop=2                " insert 2 spaces for a tab
set shiftwidth=2             " the number of space characters inserted for indentation

colors molokai
syntax on                    " enable syntax highlighting
set autoread                 " auto read when file is changed from outside
set history=50               " keep 50 lines of command line history
set mouse=a                  " mouse support

if has("gui_running")        " GUI color and font settings
  set guifont=Monaco:h14
  set t_Co=256               " 256 color mode
endif

if has("gui_macvim")         " macvim shift movement
  let macvim_hig_shift_movement = 1
endif

set cursorline               " highlight current line
set clipboard=unnamed        " yank to the system register (*) by default
set showmatch                " Cursor shows matching ) and }
set showmode                 " Show current mode
set backspace=2              " make backspace work like most other apps
set scrolloff=3
"==========  Bundle Setting ======

"==== For Python mode in vim =====
let g:pymode_rope = 0

" Documentation
let g:pymode_doc = 1
let g:pymode_doc_key = 'K'
let g:pymode_folding = 1

" Linting
let g:pymode_lint = 1
let g:pymode_lint_checker = "pyflakes,pep8"

" Auto check on save
let g:pymode_lint_write = 0
let g:pymode_lint_on_fly = 1
let g:pymode_lint_message = 1
let g:pymode_lint_cwindow = 0

" Support virtualenv
let g:pymode_virtualenv = 1

" Syntax hightlighting.
let g:pymode_syntax = 1
let g:pymode_syntax_all = 1
let g:pymode_syntax_indent_errors = g:pymode_syntax_all
let g:pymode_syntax_space_errors = g:pymode_syntax_all

" ======  Pydict =====
let g:pydiction_location = '/Users/Calvin/.vim/bundle/pydiction/complete-dict'

" ===== Web Dev =====
autocmd filetype html,css EmmetInstall
let g:user_emmet_install_global = 0
" JavaScript folding setting, note that it will effect python folding too.
"set foldmethod=syntax
"set foldlevelstart=1
let javascript_fold=1
set foldmethod=indent
set foldnestmax=2
" ===== For Nerd Tree Setting =====
map <F2> :NERDTreeToggle<CR>
map <F1> :NERDTreeTabsToggle<CR>

" =====  syntastic =====
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

"let g:syntastic_always_populate_loc_list = 0
"let g:syntastic_auto_loc_list = 1
"let g:syntastic_check_on_open = 0
"let g:syntastic_check_on_wq = 1
"let g:syntastic_python_pep8_args='--ignore=E501,E225'
"let g:syntastic_python_flake8_args='--ignore=E501,E225'

