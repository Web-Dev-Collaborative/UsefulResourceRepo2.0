---
title: "VSCode on Google Colab"
date: 2020-09-01T00:00-00:00
last_modified_at: 2020-10-08T00:00:00-00:00
permalink: /vscode-on-colab/
categories:
  - colab
excerpt: Learn how to setup and use VSCode as an IDE on Google Colab and Kaggle.
header:
  og_image: /images/colab-vscode.png
  teaser: /images/colab-vscode.png
classes: wide
---

I recently discovered a way to set up VSCode on Google Colab and use it as an editor to write code and run experiments on the Colab VM.

With this setup, you can still prototype in the Colab Notebook while also using VSCode for all the advantages of a full-fledged code editor. Here is how you can replicate my setup.

## Approach 1: Python Package

In this setup, we use the [colab-code](https://github.com/abhishekkrthakur/colabcode) package that automates all the manual setup steps previously described in the **Approach 2** section of this blog post. You can make a copy of this [notebook](https://colab.research.google.com/github/abhishekkrthakur/colabcode/blob/master/colab_starter.ipynb) directly to get started.

1. First, install the `colab-code` package using the following command:

   ```python
   pip install colabcode
   ```

2. Now, import `ColabCode` class from the package and specify the port and password.

   ```python
   from colabcode import ColabCode
   ColabCode(port=10000, password="password123")
   ```

   You can also use it directly with the default port and without any password as shown below.

   ```python
   from colabcode import ColabCode
   ColabCode()
   ```

3. You will get the ngrok URL in the output. Click the link and a login page will open in a new tab.

   ![Generated NGROK URL](/images/colab-code-step-1.png){:.align-center}

4. Type the password you had set in step 2 and click submit. If the page gets stuck for more than 4-5 seconds, refresh the page and you should be redirected to the editor.

   ![Authenticating with password in VSCode](/images/colab-code-step-2.png){:.align-center}

5. Now you will get access to the editor interface and can use it to work on python files.

   ![VSCode Interface](/images/colab-code-step-3.png){:.align-center}

## Approach 2: Manual Setup

I have described the setup steps in detail below. After going through all the steps, please use this [colab notebook](https://colab.research.google.com/drive/1yvUy5Gn9lPjmCQH6RjD_LvUO2NE0Z7RM?usp=sharing) to try it out directly.

1. First, we will install the [code-server](https://github.com/cdr/code-server) package to run VSCode editor as a web app. Copy and run the following command on colab to install `code-server`.

   ```
   !curl -fsSL https://code-server.dev/install.sh | sh
   ```

2. After the installation is complete, we will expose a random port `9000` to an external URL we can access using the `pyngrok` package. To install `pyngrok`, run

   ```shell
   !pip install -qqq pyngrok
   ```

3. Then, run the following command to get a public ngrok URL. This will be the URL we will use to access VSCode.

   ```python
   from pyngrok import ngrok
   url = ngrok.connect(port=9000)
   print(url)
   ```

4. Now, we will start the VSCode server in the background at port 9000 without any authentication using the following command.

   ```
   !nohup code-server --port 9000 --auth none &
   ```

5. Now, you can access the VSCode interface at the URL you got from step 3. The interface and functionality are the same as the desktop version of VSCode.

![Example of a running instance of VSCode server](/images/colab-vscode.png){:.align-center}

## Usage Tips

1. You can switch to the dark theme by going to the bottom-left corner of the editor, clicking the **settings icon**, and then clicking '**Color Theme**'.

   ![Switching to dark theme on VSCode](/images/colab-dark-theme-step-1.png){:.align-center}

   A popup will open. Select **Dark (Visual Studio)** in the options and the editor will switch to a dark theme.
   ![Theme selection interface on VSCode](/images/colab-dark-theme-step-2.png){:.align-center}

2. All the keyword shortcuts of regular VSCode works with this. For example, you can use `Ctrl + Shift + P` to open a popup for various actions.

   ![Action popup in VSCode](/images/vscode-ctrl-shift-p.png){:.align-center}

3. To open a terminal, you can use the shortcut `` Ctrl + Shift + `  ``.

   ![Opening integrated terminal in VSCode](/images/vscode-terminal.png){:.align-center}

4. To get python code completions, you can install the Python(`ms-python`) extension from the extensions page on the left sidebar.

   ![Installing extensions in VSCode](/images/vscode-code-completions.png){:.align-center}

5. The Colab interface is still usable as a notebook and regular functions to upload and download files and mount with Google Drive. Thus, you get the benefits of both a notebook and a code editor.

## References

- [Code-Server FAQs](https://github.com/cdr/code-server/blob/v3.5.0/doc/FAQ.md)
- [pyngrok - a Python wrapper for ngrok](https://pyngrok.readthedocs.io/en/latest/)
