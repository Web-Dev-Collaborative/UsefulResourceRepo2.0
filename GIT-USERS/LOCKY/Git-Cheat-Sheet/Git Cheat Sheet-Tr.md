Git Cheat Sheet Turkish
===============


###Index
* [Oluşturma](#oluşturma)
* [Yerel Değişiklikler](#yerel-değişiklikler)
* [Commit Geçmişi](#commit-geçmişi)
* [Branches & Tags(Etiketler)](#branches--tags)
* [Güncelleştirme & Yayınlama](#güncelleştirme--yayınlama)
* [Merge(Birleştirme) & Rebase](#merge--rebase)
* [Geri Alma](#geri-alma)

<hr>
###Oluşturma

Var olan bir repositoryi(depoyu) klonlama:
```
$ git clone ssh://user@domain.com/repo.git
```

Yeni bir yerel repository(depo) oluşturma:
```
$ git init
```

<hr>
###Yerel Değişiklikler

Çalışılan dizindeki dosyaların değişimi:
```
$ git status
```

İzlenen dosyalardaki değişiklikler:
```
$ git diff
```

Tüm güncel değişiklikleri sonraki commite ekleme:
```
$ git add
```

Sonraki commite &lt;dosyasındaki&gt; bazı değişikleri ekleme:
```
$ git add -p <file>
```

Tüm izlenen dosyalardaki yerel değişiklikleri Commitleme:
```
$ git commit -a
```

Önceden hazırlanan değişiklikleri commitleme:
```
$ git commit
```

Mesaj ile commitleme:
```
$ git commit -m 'message here'
```

Son commiti değiştirme:<br>
<em><sub>Yayınlanan commite değişiklik yapmayın!</sub></em>
```
$ git commit --amend
```

<hr>
###Commit Geçmişi

Tüm commitleri en yenisinden başlayarak listeler:
```
$ git log
```

Belirli bir dosya üzerinde zaman içinde meydana gelen değişiklikleri göstermektedir:
```
$ git log -p <file>
```
&lt;Dosyayı&gt; kim , ne ve ne zaman değiştirdiğini gösterir.:
```
$ git blame <file>
```

<hr>
###Branches & Tags

Tüm var olan branchleri listeler:
```
$ git branch
```

Ana branchi değiştirir:
```
$ git checkout <branch>
```

Mevcut ana branchte yeni bir branch oluşturur:
```
$ git branch <new-branch>
```

Remote branchte yeni bir izlenen branch oluşturur:
```
$ git branch --track <new-branch> <remote-branch>
```

Yerel branchi siler:
```
$ git branch -d <branch>
```

Güncel commiti etiket ile işaretler:
```
$ git tag <tag-name>
```

<hr>
###Güncelleştirme & Yayınlama

Yapılandırılmış tüm güncel remoteları listeler:
```
$ git remote -v
```

Belirli bir &lt;remote&gt; hakkında bilgileri gösterir.:
```
$ git remote show <remote>
```

Yeni remote repository oluşturur, &lt;remote&gt; diye isimlendirir:
```
$ git remote add <remote> <url>
```

&lt;Remote&gt; da bulunan tüm değişiklikleri indirir, ama ana brachle birleştirmez:
```
$ git fetch <remote>
```

Değişiklikleri indirir ve doğrudan ana brache merge/integrate eder:
```
$ git remote pull <remote> <url>
```

Tüm ana Branchteki değişiklikleri yerel repositorye ekler:
```
$ git pull origin master
```

Remote da bulunan repositorye(depoya), yerel değişiklikleri yayınlar:
```
$ git push remote <remote> <branch>
```

Remote da bulunan bir branchi siler:
```
$ git push <remote> :<branch>
```

Etiketleri yayınlar:
```
$ git push --tags
```

<hr>
###Merge & Rebase

Merge <branch> into your current HEAD:
```
$ git merge <branch>
```

Rebase your current HEAD onto &lt;branch&gt;:<br>
<em><sub>Don't rebase published commit!</sub></em>
```
$ git rebase <branch>
```

Rabase iptal etmek:
```
$ git rebase --abort
```

Çakışmaları çözümledikten sonra rebase devam etmek:
```
$ git rebase --continue
```

Çatışmaları çözmek için yapılandırılmış birleştirme aracını kullanmak:
```
$ git mergetool
```

Use your editor to manully solve conflicts and (after resolving) mark file as resolved:
```
$ git add <resolved-file>
```
```
$ git rm <resolved-file>
```

<hr>
###Geri Alma

Çalışılan dosyadaki tüm yerel değişiklikleri kaldırır:
```
$ git reset --hard HEAD
```

Belli bir dosyadaki yerel değişiklikleri kaldırır:
```
$ git checkout HEAD <file>
```

Revert a commit (by producing a new commit with contrary changes):
```
$ git revert <commit>
```

Reset your HEAD pointer to a previous commit and discard all changes since then:
```
$ git reset --hard <commit>
```

Reset your HEAD pointer to a previous commit and preserve all changes as unstaged changes:
```
$ git reset <commit>
```

Reset your HEAD pointer to a previous commit and preserve uncommitted local changes:
```
$ git reset --keep <commit>
```

<hr>
