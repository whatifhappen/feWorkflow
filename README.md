### feWorkflow是什么？

Gulp UI改名feWorkflow.

feWorkflow实际上是一套完整的gulp工作流，以electron为基础将gulpfile.js以及所依赖的node_modules封装在一起的一个图形界面。

### 为什么要做UI？

gulp工作流在实际使用中根据项目需求变得越来越复杂，依赖的node_modules变多，需要使用更多的命令来处理不同的需求，灵活性较低。随着项目文件的增加导致操作时间也增加，使用成本变高。使用UI，可以降低团队成员使用成本，快速上手和开发项目。

### 介绍

#### 一键式开发/压缩

1. less实时监听编译css
2. css前缀自动补全
3. 格式化html，并自动替换src源码路径为idc发布路径
4. 压缩图片(png|jpg|gif|svg)
5. 压缩或格式化js，并自动替换src源码路径为idc发布路径
6. 同步刷新浏览器browserSync

#### 编译单一文件或者类型

切换菜单到特定的编译方式时可以编译单一文件或者文件夹下同类型到idc/dist目录

### 工作流目录结构：

- **主目录结构**

```
  ├── 主目录 
  │ ├── src //源码路径 
  │ ├── dev //开发阶段编译路径 
  │ └── idc //压缩编译的发布目录

```

- **src目录结构**

```
  ├── src  
  │ ├── img   
  │ ├── css //less 源码目录  
  │ │ ├── import.something.less // 引用库，不会被编译  
  │ │ └── style.less // 编译成 style.css  
  │ ├── libs // 依赖库  
  │ ├── js  
  │ └── index.html

```

### 说明：

**A. windows**

1. 使用exe安装包执行安装（请使用英文路径，不能带空格或特殊字符，如C:\gulp）；
2. 请耐心等待安装完毕（ **请勿手动关闭cmd窗口**。因gulp-imagemin文件名过长只能通过解压缩处理）
3. 点击nw.exe或者桌面图标即可开始使用。

**B. mac**

1. 使用终端工具，安装全局gulp：

   使用终端工具，安装全局gulp：   `npm i -g gulp@3.9.1`

2. 直接打开gulp app使用

   ​

### 使用说明：

- **拖放**或者 **点击**选择src源码文件夹，源码路径以src文件夹为起点开始操作；（若无src目录，则会创建一个dist目录存放编译后的文件）
- 当点击 **开发**，会启动 [browserSync](http://www.browsersync.io/)（前端测试刷新工具）静态服务器。监听less文件，并自动编译，补全前缀到dev目录；编译src下所有less，压缩css，补全前缀，并替换src路径为idc;监听html文件，自动替换路径地址为dev目录;监听图片文件，修改时自动刷新浏览器;
- 当点击 **压缩**编译src下所有html，并替换src路径为idc;编译src下所有less，压缩css，补全前缀，并替换src路径为idc;编译src下所有js，可选压缩或不压缩js，并替换src路径为idc;压缩src下所有图片，包括png,gif,jpeg,svg;

### 期待你的反馈和建议