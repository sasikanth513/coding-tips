[
  {
    "Author": "stackoverflow",
    "url": "https://stackoverflow.com",
    "format": "html",
    "tips": [
      {
        "title": "How to undo the most recent commits in Git?",
        "body": "<h3>Undo a commit and redo</h3>\n\n<pre class=\"lang-sh prettyprint-override\"><code>$ git commit -m \"Something terribly misguided\"              (1)\n$ git reset HEAD~                                           (2)\n&lt;&lt; edit files as necessary &gt;&gt;                               (3)\n$ git add ...                                               (4)\n$ git commit -c ORIG_HEAD                                   (5)\n</code></pre>\n\n<ol>\n<li>This is what you want to undo</li>\n<li>This leaves your working tree (the state of your files on disk) unchanged but undoes the commit and leaves the changes you committed unstaged (so they'll appear as \"Changes not staged for commit\" in <code>git status</code>, and you'll need to add them again before committing). If you <em>only</em> want to <em>add</em> more changes to the previous commit, or change the commit message<sup>1</sup>, you could use <code>git reset --soft HEAD~</code> instead, which is like <code>git reset HEAD~</code> (where <code>HEAD~</code> is the same as <code>HEAD~1</code>) but leaves your existing changes staged.</li>\n<li>Make corrections to working tree files.</li>\n<li><code>git add</code> anything that you want to include in your new commit.</li>\n<li>Commit the changes, reusing the old commit message. <code>reset</code> copied the old head to <code>.git/ORIG_HEAD</code>; <code>commit</code> with <code>-c ORIG_HEAD</code> will open an editor, which initially contains the log message from the old commit and allows you to edit it. If you do not need to edit the message, you could use the <code>-C</code> option.</li>\n</ol>\n\n<hr>\n\n<p><sup>1</sup> Note, however, that you don't need to reset to an earlier commit if you just made a mistake in your <em>commit message</em>. The easier option is to <code>git reset</code> (to upstage any changes you've made since) and then <a href=\"https://stackoverflow.com/q/179123/1146608\"><code>git commit --amend</code></a>, which will open your default commit message editor pre-populated with the last commit message. </p>\n\n<p>Beware however that if you have added any new changes to the index, using <code>commit --amend</code> will add them to your previous commit.</p>\n\n<p>---- Edit by Frank R. 2018-3-9</p>\n\n<p>If pushed,</p>\n\n<pre><code>git push origin master --force\n</code></pre>\n",
        "source": "so",
        "questionId": 927358
      },
      {
        "title": "How do I delete a Git branch both locally and remotely?",
        "body": "<h1>Executive Summary</h1>\n\n<pre><code>$ git push -d &lt;remote_name&gt; &lt;branch_name&gt;\n$ git branch -d &lt;branch_name&gt;\n</code></pre>\n\n<p>Note that in most cases the remote name is <code>origin</code>.</p>\n\n<h1>Delete Local Branch</h1>\n\n<p>To delete the <em>local</em> branch use one of the following:</p>\n\n<pre><code>$ git branch -d branch_name\n$ git branch -D branch_name\n</code></pre>\n\n<p><strong>Note:</strong> The <code>-d</code> option is an alias for <code>--delete</code>, which only deletes the branch if it has already been fully merged in its upstream branch. You could also use <code>-D</code>, which is an alias for <code>--delete --force</code>, which deletes the branch \"irrespective of its merged status.\" [Source: <code>man git-branch</code>] </p>\n\n<h1>Delete Remote Branch [Updated on 8-Sep-2017]</h1>\n\n<p>As of <a href=\"https://github.com/gitster/git/blob/master/Documentation/RelNotes/1.7.0.txt\" rel=\"noreferrer\">Git v1.7.0</a>, you can delete a <strong><em>remote</em></strong> branch using</p>\n\n<pre><code>$ git push &lt;remote_name&gt; --delete &lt;branch_name&gt;\n</code></pre>\n\n<p>which might be easier to remember than</p>\n\n<pre><code>$ git push &lt;remote_name&gt; :&lt;branch_name&gt;\n</code></pre>\n\n<p>which was added in <a href=\"https://github.com/gitster/git/blob/master/Documentation/RelNotes/1.5.0.txt\" rel=\"noreferrer\">Git v1.5.0</a> \"to delete a remote branch or a tag.\"</p>\n\n<p>Starting on <a href=\"https://github.com/git/git/blob/master/Documentation/RelNotes/2.8.0.txt\" rel=\"noreferrer\">Git v2.8.0</a> you can also use <code>git push</code> with the <code>-d</code> option as an alias for <code>--delete</code>.</p>\n\n<p>Therefore, the version of Git you have installed will dictate whether you need to use the easier or harder syntax.</p>\n\n<h2>Delete Remote Branch [Original Answer from 5-Jan-2010]</h2>\n\n<p>From Chapter 3 of <a href=\"http://git-scm.com/book/en/Git-Branching-Remote-Branches\" rel=\"noreferrer\"><em>Pro Git</em></a> by Scott Chacon:</p>\n\n<blockquote>\n  <h3>Deleting Remote Branches</h3>\n  \n  <p>Suppose you’re done with a remote branch — say, you and your collaborators are finished with a feature and have merged it into your remote’s master branch (or whatever branch your stable codeline is in). You can delete a remote branch using the rather obtuse syntax <code>git push [remotename] :[branch]</code>. If you want to delete your serverfix branch from the server, you run the following:</p>\n\n<pre><code>$ git push origin :serverfix\nTo git@github.com:schacon/simplegit.git\n - [deleted]         serverfix\n</code></pre>\n  \n  <p>Boom. No more branch on your server. You may want to dog-ear this page, because you’ll need that command, and you’ll likely forget the syntax. A way to remember this command is by recalling the <code>git push [remotename] [localbranch]:[remotebranch]</code> syntax that we went over a bit earlier. If you leave off the <code>[localbranch]</code> portion, then you’re basically saying, “Take nothing on my side and make it be <code>[remotebranch]</code>.”</p>\n</blockquote>\n\n<p>I issued <code>git push origin :bugfix</code> and it worked beautifully. Scott Chacon was right—I will want to <a href=\"http://en.wiktionary.org/wiki/dogear#Verb\" rel=\"noreferrer\">dog ear</a> that page (or virtually dog ear by answering this on Stack&nbsp;Overflow).</p>\n\n<p>Then you should execute this on other machines</p>\n\n<pre><code>git fetch --all --prune\n</code></pre>\n\n<p>to propagate changes.</p>\n",
        "source": "so",
        "questionId": 2003505
      },
      {
        "title": "What is the difference between &#39;git pull&#39; and &#39;git fetch&#39;?",
        "body": "<p>In the simplest terms, <code>git pull</code> does a <code>git fetch</code> followed by a <code>git merge</code>.</p>\n\n<p>You can do a <code>git fetch</code> at any time to update your remote-tracking branches under <code>refs/remotes/&lt;remote&gt;/</code>.</p>\n\n<p>This operation never changes any of your own local branches under <code>refs/heads</code>, and is safe to do without changing your working copy. I have even heard of people running <code>git fetch</code> periodically in a cron job in the background (although I wouldn't recommend doing this).</p>\n\n<p>A <code>git pull</code> is what you would do to bring a local branch up-to-date with its remote version, while also updating your other remote-tracking branches.</p>\n\n<p>Git documentation: <a href=\"http://git-scm.com/docs/git-pull\" rel=\"noreferrer\"><strong>git pull</strong></a></p>\n",
        "source": "so",
        "questionId": 292357
      },
      {
        "title": "How to modify existing, unpushed commits?",
        "body": "<h1>Amending the most recent commit message</h1>\n\n<pre class=\"lang-sh prettyprint-override\"><code>git commit --amend\n</code></pre>\n\n<p>will open your editor, allowing you to change the commit message of the most recent commit. Additionally, you can set the commit message directly in the command line with:</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code>git commit --amend -m \"New commit message\"\n</code></pre>\n\n<p>…however, this can make multi-line commit messages or small corrections more cumbersome to enter.</p>\n\n<p>Make sure you don't have any working copy changes <em>staged</em> before doing this or they will get committed too. (<em>Unstaged</em> changes will not get committed.)</p>\n\n<h2>Changing the message of a commit that you've already pushed to your remote branch</h2>\n\n<p>If you've already pushed your commit up to your remote branch, then you'll <a href=\"https://stackoverflow.com/questions/41003071/why-must-i-force-push-after-changing-a-commit-message\">need to force push the commit</a> with: </p>\n\n<pre class=\"lang-bash prettyprint-override\"><code>git push &lt;remote&gt; &lt;branch&gt; --force\n# Or\ngit push &lt;remote&gt; &lt;branch&gt; -f\n</code></pre>\n\n<p><strong>Warning: force-pushing will overwrite the remote branch with the state of your local one</strong>. If there are commits on the remote branch that you don't have in your local branch, you <em>will</em> lose those commits.</p>\n\n<p><strong>Warning: be cautious about amending commits that you have already shared with other people.</strong> Amending commits essentially <em>rewrites</em> them to have different <a href=\"http://en.wikipedia.org/wiki/SHA-1\" rel=\"noreferrer\">SHA</a> IDs, which poses a problem if other people have copies of the old commit that you've rewritten. Anyone who has a copy of the old commit will need to synchronize their work with your newly re-written commit, which can sometimes be difficult, so make sure you coordinate with others when attempting to rewrite shared commit history, or just avoid rewriting shared commits altogether.</p>\n\n<hr>\n\n<h3>Use interactive rebase</h3>\n\n<p>Another option is to use interactive rebase.<br>\nThis allows you to edit any message you want to update even if it's not the latest message.</p>\n\n<p>In order to do a git squash, follow these steps:</p>\n\n<pre><code>// X is the number of commits to the last commit you want to be able to edit\ngit rebase -i HEAD~X\n</code></pre>\n\n<p>Once you squash your commits - choose the <code>e/r</code> for editing the message</p>\n\n<p><a href=\"https://i.stack.imgur.com/LVcm9.png\" rel=\"noreferrer\"><img src=\"https://i.stack.imgur.com/LVcm9.png\" alt=\"enter image description here\"></a></p>\n\n<h3>Important note about Interactive rebase</h3>\n\n<p>When you use the <code>git rebase -i HEAD~X</code> there can be <strong>more</strong> than <code>X</code> commits. Git will \"collect\" all the commits in the last <code>X</code> commits and if there was a merge somewhere in between that range you will see all the commits as well so the outcome will be X+.</p>\n\n<h3>Good tip:</h3>\n\n<p>If you have to do it for more than a single branch and you might face conflicts when amending the content, set up <a href=\"https://stackoverflow.com/questions/35415925/is-it-possible-to-setup-git-merge-for-automatic-resolving-git-rerere/35417944#35417944\"><code>git rerere</code></a> and let git resolve those conflicts automatically for you.</p>\n\n<hr>\n\n<h2>Documentation</h2>\n\n<ul>\n<li><p><a href=\"https://www.kernel.org/pub/software/scm/git/docs/git-commit.html\" rel=\"noreferrer\">git-commit(1) Manual Page</a></p></li>\n<li><p><a href=\"https://www.kernel.org/pub/software/scm/git/docs/git-rebase.html\" rel=\"noreferrer\">git-rebase(1) Manual Page</a></p></li>\n<li><p><a href=\"https://www.kernel.org/pub/software/scm/git/docs/git-push.html\" rel=\"noreferrer\">git-push(1) Manual Page</a></p></li>\n</ul>\n",
        "source": "so",
        "questionId": 179123
      },
      {
        "title": "How to undo &#39;git add&#39; before commit?",
        "body": "<p>You can undo <code>git add</code> before commit with</p>\n\n<pre><code>git reset &lt;file&gt;\n</code></pre>\n\n<p>which will remove it from the current index (the \"about to be committed\" list) without changing anything else.</p>\n\n<p>You can use</p>\n\n<pre><code>git reset\n</code></pre>\n\n<p>without any file name to unstage all due changes. This can come in handy when there are too many files to be listed one by one in a reasonable amount of time.</p>\n\n<p>In old versions of Git, the above commands are equivalent to <code>git reset HEAD &lt;file&gt;</code> and <code>git reset HEAD</code> respectively, and will fail if <code>HEAD</code> is undefined (because you haven't yet made any commits in your repo) or ambiguous (because you created a branch called <code>HEAD</code>, which is a stupid thing that you shouldn't do). This <a href=\"https://git.kernel.org/cgit/git/git.git/tree/Documentation/RelNotes/1.8.2.txt#n179\" rel=\"noreferrer\">was changed in Git 1.8.2</a>, though, so in modern versions of Git you can use the commands above even prior to making your first commit:</p>\n\n<blockquote>\n  <p>\"git reset\" (without options or parameters) used to error out when\n     you do not have any commits in your history, but it now gives you\n     an empty index (to match non-existent commit you are not even on).</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 348170
      },
      {
        "title": "How do I rename a local Git branch?",
        "body": "<p>If you want to rename a branch while pointed to any branch, do:</p>\n\n<pre><code>git branch -m &lt;oldname&gt; &lt;newname&gt;\n</code></pre>\n\n<p>If you want to rename the current branch, you can do:</p>\n\n<pre><code>git branch -m &lt;newname&gt;\n</code></pre>\n\n<p>A way to remember this, is <code>-m</code> is for \"move\" (or <code>mv</code>), which is how you rename files.</p>\n",
        "source": "so",
        "questionId": 6591213
      },
      {
        "title": "How to revert Git repository to a previous commit?",
        "body": "<p>This depends a lot on what you mean by \"revert\".</p>\n\n<h2>Temporarily switch to a different commit</h2>\n\n<p>If you want to temporarily go back to it, fool around, then come back to where you are, all you have to do is check out the desired commit:</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code># This will detach your HEAD, that is, leave you with no branch checked out:\ngit checkout 0d1d7fc32\n</code></pre>\n\n<p>Or if you want to make commits while you're there, go ahead and make a new branch while you're at it:</p>\n\n<pre><code>git checkout -b old-state 0d1d7fc32\n</code></pre>\n\n<p>To go back to where you were, just check out the branch you were on again. (If you've made changes, as always when switching branches, you'll have to deal with them as appropriate. You could reset to throw them away; you could stash, checkout, stash pop to take them with you; you could commit them to a branch there if you want a branch there.)</p>\n\n<h2>Hard delete unpublished commits</h2>\n\n<p>If, on the other hand, you want to really get rid of everything you've done since then, there are two possibilities. One, if you haven't published any of these commits, simply reset:</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code># This will destroy any local modifications.\n# Don't do it if you have uncommitted work you want to keep.\ngit reset --hard 0d1d7fc32\n\n# Alternatively, if there's work to keep:\ngit stash\ngit reset --hard 0d1d7fc32\ngit stash pop\n# This saves the modifications, then reapplies that patch after resetting.\n# You could get merge conflicts, if you've modified things which were\n# changed since the commit you reset to.\n</code></pre>\n\n<p>If you mess up, you've already thrown away your local changes, but you can at least get back to where you were before by resetting again.</p>\n\n<h2>Undo published commits with new commits</h2>\n\n<p>On the other hand, if you've published the work, you probably don't want to reset the branch, since that's effectively rewriting history. In that case, you could indeed revert the commits. With Git, revert has a very specific meaning: create a commit with the reverse patch to cancel it out. This way you don't rewrite any history.</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code># This will create three separate revert commits:\ngit revert a867b4af 25eee4ca 0766c053\n\n# It also takes ranges. This will revert the last two commits:\ngit revert HEAD~2..HEAD\n\n#Similarly, you can revert a range of commits using commit hashes:\ngit revert a867b4af..0766c053 \n\n# Reverting a merge commit\ngit revert -m 1 &lt;merge_commit_sha&gt;\n\n# To get just one, you could use `rebase -i` to squash them afterwards\n# Or, you could do it manually (be sure to do this at top level of the repo)\n# get your index and work tree into the desired state, without changing HEAD:\ngit checkout 0d1d7fc32 .\n\n# Then commit. Be sure and write a good message describing what you just did\ngit commit\n</code></pre>\n\n<p>The <a href=\"http://schacon.github.com/git/git-revert.html\" rel=\"noreferrer\"><code>git-revert</code> manpage</a> actually covers a lot of this in its description. Another useful link is <a href=\"https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging#_undoing_merges\" rel=\"noreferrer\">this git-scm.com section discussing git-revert</a>.</p>\n\n<p>If you decide you didn't want to revert after all, you can revert the revert (as described here) or reset back to before the revert (see the previous section).</p>\n\n<p>You may also find this answer helpful in this case:<br>\n<a href=\"https://stackoverflow.com/questions/34519665/how-to-move-head-forward-checkout-revet-reflog-reset/34519716#34519716\">How to move HEAD back to a previous location? (Detached head)</a></p>\n",
        "source": "so",
        "questionId": 4114095
      },
      {
        "title": "How to remove local (untracked) files from the current Git working tree?",
        "body": "<p>As per the Git Documentation <a href=\"https://git-scm.com/docs/git-clean\" rel=\"noreferrer\">git clean</a></p>\n\n<blockquote>\n  <p>Remove untracked files from the working tree</p>\n</blockquote>\n\n<hr>\n\n<p>Step 1 is to show what will be deleted by using the <code>-n</code> option:</p>\n\n<pre><code>git clean -n\n</code></pre>\n\n<p>Clean Step - <strong>beware: this will delete files</strong>:</p>\n\n<pre><code>git clean -f\n</code></pre>\n\n<ul>\n<li>To remove directories, run <code>git clean -f -d</code> or <code>git clean -fd</code></li>\n<li>To remove ignored files, run <code>git clean -f -X</code> or <code>git clean -fX</code></li>\n<li>To remove ignored and non-ignored files, run <code>git clean -f -x</code> or <code>git clean -fx</code></li>\n</ul>\n\n<p><strong>Note</strong> the case difference on the <code>X</code> for the two latter commands.</p>\n\n<p>If <code>clean.requireForce</code> is set to \"true\" (the default) in your configuration, one needs to specify <code>-f</code> otherwise nothing will actually happen.</p>\n\n<p>Again see the <a href=\"http://git-scm.com/docs/git-clean\" rel=\"noreferrer\"><code>git-clean</code></a> docs for more information.</p>\n\n<h2>Options</h2>\n\n<p><strong>-f</strong></p>\n\n<p><strong>--force</strong></p>\n\n<p>If the Git configuration variable clean.requireForce is not set to false, git clean will refuse to run unless given -f, -n or -i.</p>\n\n<p><strong>-x</strong></p>\n\n<p>Don’t use the standard ignore rules read from .gitignore (per directory) and $GIT_DIR/info/exclude, but do still use the ignore rules given with -e options. This allows removing all untracked files, including build products. This can be used (possibly in conjunction with git reset) to create a pristine working directory to test a clean build.</p>\n\n<p><strong>-X</strong></p>\n\n<p>Remove only files ignored by Git. This may be useful to rebuild everything from scratch, but keep manually created files.</p>\n\n<p><strong>-n</strong></p>\n\n<p><strong>--dry-run</strong></p>\n\n<p>Don’t actually remove anything, just show what would be done.</p>\n\n<p><strong>-d</strong></p>\n\n<p>Remove untracked directories in addition to untracked files. If an untracked directory is managed by a different Git repository, it is not removed by default. Use -f option twice if you really want to remove such a directory.</p>\n",
        "source": "so",
        "questionId": 61212
      },
      {
        "title": "How do I check out a remote Git branch?",
        "body": "<h2>Update</h2>\n\n<p><a href=\"https://stackoverflow.com/a/1787014/456814\">Jakub's answer</a> actually improves on this. With Git versions &ge; 1.6.6, you can just do:</p>\n\n<pre><code>git fetch\ngit checkout test\n</code></pre>\n\n<p>(User masukomi points out below that <code>git checkout test</code> will NOT work in modern git if you have multiple remotes. In this case use <code>git checkout -b test &lt;name of remote&gt;/test</code>).</p>\n\n<h2>Old Answer</h2>\n\n<p>Before you can start working locally on a remote branch, you need to fetch it as called out in answers below. </p>\n\n<p>To fetch a branch, you simply need to:</p>\n\n<pre><code>git fetch origin\n</code></pre>\n\n<p>This will fetch all of the remote branches for you. You can see the branches available for checkout with:</p>\n\n<pre><code>git branch -v -a\n</code></pre>\n\n<p>With the remote branches in hand, you now  need to check out the branch you are interested in, giving you a local working copy:</p>\n\n<pre><code>git checkout -b test origin/test\n</code></pre>\n",
        "source": "so",
        "questionId": 1783405
      },
      {
        "title": "How do I force &quot;git pull&quot; to overwrite local files?",
        "body": "<h2>Important: If you have any local changes, they will be lost. With or without <code>--hard</code> option, any local commits that haven't been pushed will be lost.<sup>[*]</sup></h2>\n\n<p>If you have any files that are <em>not</em> tracked by Git (e.g. uploaded user content), these files will not be affected.</p>\n\n<hr>\n\n<p>I think this is the right way:</p>\n\n<pre><code>git fetch --all\n</code></pre>\n\n<p>Then, you have two options:</p>\n\n<pre><code>git reset --hard origin/master\n</code></pre>\n\n<p>OR If you are on some other branch:</p>\n\n<pre><code>git reset --hard origin/&lt;branch_name&gt;\n</code></pre>\n\n<h3>Explanation:</h3>\n\n<p><code>git fetch</code> downloads the latest from remote without trying to merge or rebase anything.</p>\n\n<p>Then the <code>git reset</code> resets the master branch to what you just fetched. The <code>--hard</code> option changes all the files in your working tree to match the files in <code>origin/master</code></p>\n\n<hr>\n\n<p><sup>[*]</sup>: It's worth noting that it is possible to maintain current local commits by creating a branch from <code>master</code> before resetting:</p>\n\n<pre><code>git checkout master\ngit branch new-branch-to-save-current-commits\ngit fetch --all\ngit reset --hard origin/master\n</code></pre>\n\n<p>After this, all of the old commits will be kept in <code>new-branch-to-save-current-commits</code>. Uncommitted changes however (even staged), will be lost. Make sure to stash and commit anything you need.</p>\n",
        "source": "so",
        "questionId": 1125968
      },
      {
        "title": "How to resolve merge conflicts in Git?",
        "body": "<p>Try: <code>git mergetool</code></p>\n\n<p>It opens a GUI that steps you through each conflict, and you get to choose how to merge.  Sometimes it requires a bit of hand editing afterwards, but usually it's enough by itself.  It is much better than doing the whole thing by hand certainly.</p>\n\n<p>As per @JoshGlover comment:</p>\n\n<p>The command doesn't necessarily open a GUI unless you install one. Running <code>git mergetool</code> for me resulted in <code>vimdiff</code> being used. You can install one of the following tools to use it instead: <code>meld</code>, <code>opendiff</code>, <code>kdiff3</code>, <code>tkdiff</code>, <code>xxdiff</code>, <code>tortoisemerge</code>, <code>gvimdiff</code>, <code>diffuse</code>, <code>ecmerge</code>, <code>p4merge</code>, <code>araxis</code>, <code>vimdiff</code>, <code>emerge</code>.</p>\n\n<p>Below is the sample procedure to use <code>vimdiff</code> for resolve merge conflicts. Based on <a href=\"http://www.rosipov.com/blog/use-vimdiff-as-git-mergetool/#fromHistor\" rel=\"noreferrer\">this link</a></p>\n\n<p><strong>Step 1</strong>: Run following commands in your terminal</p>\n\n<pre><code>git config merge.tool vimdiff\ngit config merge.conflictstyle diff3\ngit config mergetool.prompt false\n</code></pre>\n\n<p>This will set vimdiff as the default merge tool.</p>\n\n<p><strong>Step 2</strong>: Run following command in terminal</p>\n\n<pre><code>git mergetool\n</code></pre>\n\n<p><strong>Step 3</strong>: You will see a vimdiff display in following format </p>\n\n<pre><code>  +----------------------+\n  |       |      |       |\n  |LOCAL  |BASE  |REMOTE |\n  |       |      |       |\n  +----------------------+\n  |      MERGED          |\n  |                      |\n  +----------------------+\n</code></pre>\n\n<p>These 4 views are </p>\n\n<blockquote>\n  <p>LOCAL – this is file from the current branch  </p>\n  \n  <p>BASE – common ancestor, how file looked before both changes </p>\n  \n  <p>REMOTE – file you are merging into your branch </p>\n  \n  <p>MERGED – merge result, this is what gets saved in the repo</p>\n</blockquote>\n\n<p>You can navigate among these views using <code>ctrl+w</code>. You can directly reach MERGED view using <code>ctrl+w</code> followed by <code>j</code>.</p>\n\n<p>More info about vimdiff navigation <a href=\"https://stackoverflow.com/questions/4556184/vim-move-window-left-right\">here</a> and <a href=\"https://stackoverflow.com/questions/27151456/how-do-i-jump-to-the-next-prev-diff-in-git-difftool\">here</a></p>\n\n<p><strong>Step 4</strong>. You could edit the MERGED view the following way </p>\n\n<p>If you want to get changes from REMOTE</p>\n\n<pre><code>:diffg RE  \n</code></pre>\n\n<p>If you want to get changes from BASE</p>\n\n<pre><code>:diffg BA  \n</code></pre>\n\n<p>If you want to get changes from LOCAL</p>\n\n<pre><code>:diffg LO \n</code></pre>\n\n<p><strong>Step 5</strong>. Save, Exit, Commit and Clean up</p>\n\n<p><code>:wqa</code> save and exit from vi</p>\n\n<p><code>git commit -m \"message\"</code></p>\n\n<p><code>git clean</code> Remove extra files (e.g. *.orig) created by diff tool.</p>\n",
        "source": "so",
        "questionId": 161813
      },
      {
        "title": "How do I discard unstaged changes in Git?",
        "body": "<p>Another quicker way is:</p>\n\n<pre><code>git stash save --keep-index\n</code></pre>\n\n<p>Include <code>--include-untracked</code> if you'd want to be thorough about it.</p>\n\n<p>After that, you can drop that stash with a <code>git stash drop</code> command if you like.</p>\n",
        "source": "so",
        "questionId": 52704
      },
      {
        "title": "Move the most recent commit(s) to a new branch with Git",
        "body": "<h2>Moving to a new branch</h2>\n\n<p>Unless there are other circumstances involved, this can be easily done by branching and rolling back.</p>\n\n\n\n<pre class=\"lang-sh prettyprint-override\"><code># Note: Any changes not committed will be lost.\ngit branch newbranch      # Create a new branch, saving the desired commits\ngit reset --hard HEAD~3   # Move master back by 3 commits (GONE from master)\ngit checkout newbranch    # Go to the new branch that still has the desired commits\n</code></pre>\n\n<p>But do make sure how many commits to go back. Alternatively, you can instead of <code>HEAD~3</code>, simply provide the hash of the commit (or the reference like <em>origin/master</em>) you want to \"revert back to\" on the <em>master</em> (/current) branch, e.g:</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code>git reset --hard a1b2c3d4\n</code></pre>\n\n<p>*1 You will <strong>only</strong> be \"losing\" commits from the master branch, but don't worry, you'll have those commits in newbranch!</p>\n\n<p><strong>WARNING:</strong> With Git version 2.0 and later, if you later <code>git rebase</code> the new branch upon the original (<code>master</code>) branch, you may need an explicit <code>--no-fork-point</code> option during the rebase to avoid losing the carried-over commits.  Having <code>branch.autosetuprebase always</code> set makes this more likely.  See <a href=\"https://stackoverflow.com/a/36463546/1256452\">John Mellor's answer</a> for details.</p>\n\n<h2>Moving to an existing branch</h2>\n\n<p><strong>WARNING:</strong> The method above works because you are creating a <strong>new branch</strong> with the first command: <code>git branch newbranch</code>. If you want to use an <strong>existing branch</strong> you need to merge your changes into the <strong>existing branch</strong> before executing <code>git reset --hard HEAD~3</code>. If you don't merge your changes first, they will be lost. So, if you are working with an existing branch it will look like this:</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code>git checkout existingbranch\ngit merge master\ngit checkout master\ngit reset --hard HEAD~3 # Go back 3 commits. You *will* lose uncommitted work.\ngit checkout existingbranch\n</code></pre>\n",
        "source": "so",
        "questionId": 1628563
      },
      {
        "title": "How to clone all remote branches in Git?",
        "body": "<p>First, clone a remote <a href=\"http://en.wikipedia.org/wiki/Git_%28software%29\" rel=\"noreferrer\">Git</a> repository and <a href=\"http://en.wikipedia.org/wiki/Cd_%28command%29\" rel=\"noreferrer\">cd</a> into it:</p>\n\n<pre><code>$ git clone git://example.com/myproject\n$ cd myproject\n</code></pre>\n\n<p>Next, look at the local branches in your repository:</p>\n\n<pre><code>$ git branch\n* master\n</code></pre>\n\n<p>But there are other branches hiding in your repository! You can see these using the <code>-a</code> flag:</p>\n\n<pre><code>$ git branch -a\n* master\n  remotes/origin/HEAD\n  remotes/origin/master\n  remotes/origin/v1.0-stable\n  remotes/origin/experimental\n</code></pre>\n\n<p>If you just want to take a quick peek at an upstream branch, you can check it out directly:</p>\n\n<pre><code>$ git checkout origin/experimental\n</code></pre>\n\n<p>But if you want to work on that branch, you'll need to create a local tracking branch which is done automatically by:</p>\n\n<pre><code>$ git checkout experimental\n</code></pre>\n\n<p>and you will see</p>\n\n<pre><code>Branch experimental set up to track remote branch experimental from origin.\nSwitched to a new branch 'experimental'\n</code></pre>\n\n<p>That last line throws some people: \"New branch\" - huh?\nWhat it really means is that the branch is taken from the index and created locally for you.  The <em>previous</em> line is actually more informative as it tells you that the branch is being set up to track the remote branch, which usually means the origin/branch_name branch </p>\n\n<p>Now, if you look at your local branches, this is what you'll see:</p>\n\n<pre><code>$ git branch\n* experimental\n  master\n</code></pre>\n\n<p>You can actually track more than one remote repository using <code>git remote</code>.</p>\n\n<pre><code>$ git remote add win32 git://example.com/users/joe/myproject-win32-port\n$ git branch -a\n* master\n  remotes/origin/HEAD\n  remotes/origin/master\n  remotes/origin/v1.0-stable\n  remotes/origin/experimental\n  remotes/win32/master\n  remotes/win32/new-widgets\n</code></pre>\n\n<p>At this point, things are getting pretty crazy, so run <code>gitk</code> to see what's going on:</p>\n\n<pre><code>$ gitk --all &amp;\n</code></pre>\n",
        "source": "so",
        "questionId": 67699
      },
      {
        "title": "How do I push a new local branch to a remote Git repository and track it too?",
        "body": "<p>In Git 1.7.0 and later, you can checkout a new branch:</p>\n\n<pre><code>git checkout -b &lt;branch&gt;\n</code></pre>\n\n<p>Edit files, add and commit. Then <a href=\"https://git-scm.com/docs/git-push\" rel=\"noreferrer\">push with the <code>-u</code> (short for <code>--set-upstream</code>)</a> option:</p>\n\n<pre><code>git push -u origin &lt;branch&gt;\n</code></pre>\n\n<p>Git will set up the tracking information during the push.</p>\n",
        "source": "so",
        "questionId": 2765421
      },
      {
        "title": "How to make Git &quot;forget&quot; about a file that was tracked but is now in .gitignore?",
        "body": "<p><code>.gitignore</code> will prevent untracked files from being added (without an <code>add -f</code>) to the set of files tracked by git, however git will continue to track any files that are already being tracked.</p>\n\n<p>To stop tracking a file you need to remove it from the index. This can be achieved with this command.</p>\n\n<pre><code>git rm --cached &lt;file&gt;\n</code></pre>\n\n<p>The removal of the file from the head revision will happen on the next commit.</p>\n",
        "source": "so",
        "questionId": 1274057
      },
      {
        "title": "How can I add an empty directory to a Git repository?",
        "body": "<p>Another way to make a directory stay empty (in the repository) is to create a <code>.gitignore</code> file inside that directory that contains four lines:</p>\n\n<pre><code># Ignore everything in this directory\n*\n# Except this file\n!.gitignore\n</code></pre>\n\n<p>Then you don't have to get the order right the way that you have to do in m104's solution.</p>\n\n<p>Making <a href=\"https://stackoverflow.com/users/554807/greenasjade\">@GreenAsJade</a>'s comment persistent:</p>\n\n<blockquote>\n  <p>I think it's worth noting that this solution does precisely what the question asked for, but is not perhaps what many people looking at this question will have been looking for. This solution guarantees that the directory remains empty. It says \"I truly never want files checked in here\". As opposed to \"I don't have any files to check in here, yet, but I need the directory here, files may be coming later\".</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 115983
      },
      {
        "title": "Reset or revert a specific file to a specific revision using Git?",
        "body": "<p>Assuming the hash of the commit you want is <code>c5f567</code>:</p>\n\n<pre><code>git checkout c5f567 -- file1/to/restore file2/to/restore\n</code></pre>\n\n<p>The <a href=\"https://git-scm.com/docs/git-checkout\" rel=\"noreferrer\">git checkout</a> man page gives more information.</p>\n\n<p>If you want to revert to the commit before <code>c5f567</code>, append <code>~1</code> (works with any number):</p>\n\n<pre><code>git checkout c5f567~1 -- file1/to/restore file2/to/restore\n</code></pre>\n\n<p>As a side note, I've always been uncomfortable with this command because it's used for both ordinary things (changing between branches) and unusual, destructive things (discarding changes in the working directory).</p>\n",
        "source": "so",
        "questionId": 215718
      },
      {
        "title": "Make an existing Git branch track a remote branch?",
        "body": "<p>Given a branch <code>foo</code> and a remote <code>upstream</code>:</p>\n\n<p><strong>As of Git 1.8.0:</strong></p>\n\n<pre><code>git branch -u upstream/foo\n</code></pre>\n\n<p>Or, if local branch <code>foo</code> is not the current branch:</p>\n\n<pre><code>git branch -u upstream/foo foo\n</code></pre>\n\n<p>Or, if you like to type longer commands, these are equivalent to the above two:</p>\n\n<pre><code>git branch --set-upstream-to=upstream/foo\n\ngit branch --set-upstream-to=upstream/foo foo\n</code></pre>\n\n<p><strong>As of Git 1.7.0:</strong></p>\n\n<pre><code>git branch --set-upstream foo upstream/foo\n</code></pre>\n\n<p><strong>Notes:</strong></p>\n\n<p>All of the above commands will cause local branch <code>foo</code> to track remote branch <code>foo</code> from remote <code>upstream</code>.  The old (1.7.x) syntax is deprecated in favor of the new (1.8+) syntax.  The new syntax is intended to be more intuitive and easier to remember.</p>\n\n<hr>\n\n<p>See also: <a href=\"https://stackoverflow.com/q/6089294/95706\">Why do I need to do `--set-upstream` all the time?</a></p>\n",
        "source": "so",
        "questionId": 520650
      },
      {
        "title": "How do I remove a submodule?",
        "body": "<p>Since <a href=\"https://github.com/git/git/blob/v1.8.3-rc0/Documentation/RelNotes/1.8.3.txt#L135-L137\" rel=\"noreferrer\">git1.8.3 (April 22d, 2013)</a>:</p>\n\n<blockquote>\n  <p>There was no Porcelain way to say \"I no longer am interested in this submodule\", once you express your interest in a submodule with \"<code>submodule init</code>\".<br>\n  \"<strong><code>submodule deinit</code></strong>\" is the way to do so. </p>\n</blockquote>\n\n<p>The deletion process also uses <code>git rm</code> (since git1.8.5 October 2013).  </p>\n\n<h2>Summary</h2>\n\n<p>The 3-steps removal process would then be:</p>\n\n<pre><code>0. mv a/submodule a/submodule_tmp\n\n1. git submodule deinit -f -- a/submodule    \n2. rm -rf .git/modules/a/submodule\n3. git rm -f a/submodule\n# Note: a/submodule (no trailing slash)\n\n# or, if you want to leave it in your working tree and have done step 0\n3.   git rm --cached a/submodule\n3bis mv a/submodule_tmp a/submodule\n</code></pre>\n\n<h2>Explanation</h2>\n\n<p><code>rm -rf</code>: This is mentioned in <a href=\"https://stackoverflow.com/users/2753241/daniel-schroeder\">Daniel Schroeder</a>'s <a href=\"https://stackoverflow.com/a/26505847/6309\">answer</a>, and summarized by <a href=\"https://stackoverflow.com/users/246776/eonil\">Eonil</a> in <a href=\"https://stackoverflow.com/questions/1260748/how-do-i-remove-a-git-submodule/16162000?noredirect=1#comment41729982_16162000\">the comments</a>:</p>\n\n<blockquote>\n  <p>This leaves <code>.git/modules/&lt;path-to-submodule&gt;/</code> unchanged.<br>\n  So if you once delete a submodule with this method and re-add them again, it will not be possible because repository already been corrupted.</p>\n</blockquote>\n\n<hr>\n\n<p><code>git rm</code>: See <a href=\"https://github.com/git/git/commit/95c16418f0375e2fc325f32c3d7578fba9cfd7ef\" rel=\"noreferrer\">commit 95c16418</a>:</p>\n\n<blockquote>\n  <p>Currently using \"<code>git rm</code>\" on a submodule removes the submodule's work tree from that of the superproject and the gitlink from the index.<br>\n  But the submodule's section in <code>.gitmodules</code> is left untouched, which is a leftover of the now removed submodule and might irritate users (as opposed to the setting in <code>.git/config</code>, this must stay as a reminder that the user showed interest in this submodule so it will be repopulated later when an older commit is checked out).</p>\n  \n  <p>Let \"<code>git rm</code>\" help the user by not only removing the submodule from the work tree but by also removing the \"<code>submodule.&lt;submodule name&gt;</code>\" section from the <code>.gitmodules</code> file and stage both.</p>\n</blockquote>\n\n<hr>\n\n<p><code>git submodule deinit</code>: It stems from <a href=\"http://git.661346.n2.nabble.com/PATCH-v3-submodule-add-deinit-command-td7576946.html\" rel=\"noreferrer\">this patch</a>:</p>\n\n<blockquote>\n  <p>With \"<code>git submodule init</code>\" the user is able to tell git they care about one or more submodules and wants to have it populated on the next call to \"<code>git submodule update</code>\".<br>\n  But currently there is no easy way they can tell git they do not care about a submodule anymore and wants to get rid of the local work tree (unless the user knows a lot about submodule internals and removes the \"<code>submodule.$name.url</code>\" setting from <code>.git/config</code> together with the work tree himself).</p>\n  \n  <p>Help those users by providing a '<strong><code>deinit</code></strong>' command.<br>\n  This <strong>removes the whole <code>submodule.&lt;name&gt;</code> section from <code>.git/config</code> either for the given\n  submodule(s)</strong> (or for all those which have been initialized if '<code>.</code>' is given).<br>\n  Fail if the current work tree contains modifications unless forced.<br>\n  Complain when for a submodule given on the command line the url setting can't be found in <code>.git/config</code>, but nonetheless don't fail. </p>\n</blockquote>\n\n<p>This takes care if the (de)initialization steps (<code>.git/config</code> and <code>.git/modules/xxx</code>)</p>\n\n<p>Since git1.8.5, the <code>git rm</code> takes <em>also</em> care of the:</p>\n\n<ul>\n<li>'<code>add</code>' step which records the url of a submodule in the <code>.gitmodules</code> file: it is need to removed for you.</li>\n<li>the submodule <strong><a href=\"https://stackoverflow.com/questions/1992018/git-submodule-update-needed-only-initially/2227598#2227598\">special entry</a></strong> (as illustrated by <a href=\"https://stackoverflow.com/q/16574625/6309\">this question</a>): the git rm removes it from the index:<br>\n<code>git rm --cached path_to_submodule</code> (no trailing slash)<br>\nThat will remove that directory stored in the index with a special mode \"160000\", marking it as a submodule root directory.</li>\n</ul>\n\n<p>If you forget that last step, and try to add what was a submodule as a regular directory, you would get error message like:</p>\n\n<pre><code>git add mysubmodule/file.txt \nPath 'mysubmodule/file.txt' is in submodule 'mysubmodule'\n</code></pre>\n\n<hr>\n\n<p>Note: since Git 2.17 (Q2 2018), git submodule deinit is no longer a shell script.<br>\nIt is a call to a C function.</p>\n\n<p>See <a href=\"https://github.com/git/git/commit/2e612731b55f1a83fb5b7f4ecb9391f0cba63cb2\" rel=\"noreferrer\">commit 2e61273</a>, <a href=\"https://github.com/git/git/commit/13424764db3273091d136bd470cf14852255c98c\" rel=\"noreferrer\">commit 1342476</a> (14 Jan 2018) by <a href=\"https://github.com/pratham-pc\" rel=\"noreferrer\">Prathamesh Chavan (<code>pratham-pc</code>)</a>.<br>\n<sup>(Merged by <a href=\"https://github.com/gitster\" rel=\"noreferrer\">Junio C Hamano -- <code>gitster</code> --</a> in <a href=\"https://github.com/git/git/commit/ead8dbe2e14ee9a2a18ccd0ad7bca806e1be0d54\" rel=\"noreferrer\">commit ead8dbe</a>, 13 Feb 2018)</sup>  </p>\n\n<pre><code>git ${wt_prefix:+-C \"$wt_prefix\"} submodule--helper deinit \\\n  ${GIT_QUIET:+--quiet} \\\n  ${prefix:+--prefix \"$prefix\"} \\\n  ${force:+--force} \\\n  ${deinit_all:+--all} \"$@\"\n</code></pre>\n",
        "source": "so",
        "questionId": 1260748
      },
      {
        "title": "Undo a Git merge that hasn&#39;t been pushed yet",
        "body": "<p>With <code>git reflog</code> check which commit is one prior the merge(git reflog will be better option than git log ). Then you can reset it using:</p>\n\n<pre><code>git reset --hard commit_sha\n</code></pre>\n\n<p>There's also another way</p>\n\n<pre><code>git reset --hard HEAD~1\n</code></pre>\n\n<p>will get you back 1 commit.</p>\n\n<p><strong>Be aware that any modified and uncommitted/unstashed files will be reset to their unmodified state</strong>. To keep them either stash changes away or see <code>--merge</code> option below.  </p>\n\n<hr>\n\n<p>As @Velmont suggested below in his answer, in this direct case using:</p>\n\n<pre><code>git reset --hard ORIG_HEAD\n</code></pre>\n\n<p>might yield better results, as it should preserve your changes. <code>ORIG_HEAD</code> will point to a commit directly before merge has occurred, so you don't have to hunt for it yourself.</p>\n\n<hr>\n\n<p>A further tip is to use the <code>--merge</code> switch instead of <code>--hard</code> since it doesn't reset files unnecessarily:</p>\n\n<blockquote>\n  <p>--merge</p>\n  \n  <p>Resets the index and updates the files in the working tree that are different between &lt;commit&gt; and HEAD, but keeps those which are different between the index and working tree (i.e. which have changes which have not been added).      </p>\n</blockquote>\n",
        "source": "so",
        "questionId": 2389361
      },
      {
        "title": "How do I update a GitHub forked repository?",
        "body": "<p>In your local clone of your forked repository, you can add the original GitHub repository as a \"remote\".  (\"Remotes\" are like nicknames for the URLs of repositories - <code>origin</code> is one, for example.)  Then you can fetch all the branches from that upstream repository, and rebase your work to continue working on the upstream version.  In terms of commands that might look like:</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code># Add the remote, call it \"upstream\":\n\ngit remote add upstream https://github.com/whoever/whatever.git\n\n# Fetch all the branches of that remote into remote-tracking branches,\n# such as upstream/master:\n\ngit fetch upstream\n\n# Make sure that you're on your master branch:\n\ngit checkout master\n\n# Rewrite your master branch so that any commits of yours that\n# aren't already in upstream/master are replayed on top of that\n# other branch:\n\ngit rebase upstream/master\n</code></pre>\n\n<p>If you don't want to rewrite the history of your master branch, (for example because other people may have cloned it) then you should replace the last command with <code>git merge upstream/master</code>.  However, for making further pull requests that are as clean as possible, it's probably better to rebase.</p>\n\n<hr>\n\n<p>If you've rebased your branch onto <code>upstream/master</code> you may need to force the push in order to push it to your own forked repository on GitHub.  You'd do that with:</p>\n\n<pre><code>git push -f origin master\n</code></pre>\n\n<p>You only need to use the <code>-f</code> the first time after you've rebased.</p>\n",
        "source": "so",
        "questionId": 7244321
      },
      {
        "title": "Change the URI (URL) for a remote Git repository",
        "body": "<p>You can</p>\n\n<pre><code>git remote set-url origin git://new.url.here\n</code></pre>\n\n<p>(see <code>git help remote</code>) or you can just edit <code>.git/config</code> and change the URLs there. You're not in any danger of losing history unless you do something very silly (and if you're worried, just make a copy of your repo, since your repo <em>is</em> your history.)</p>\n",
        "source": "so",
        "questionId": 2432764
      },
      {
        "title": "How do you create a remote Git branch?",
        "body": "<h2>Simple Git 2.0+ solution:</h2>\n\n<p>As of <strong>Git 2.0 the behaviour has become simpler</strong>: </p>\n\n<p>You can configure git with <strong><code>push.default = current</code></strong> to make life easier:</p>\n\n<p>I added this so now I can just push a new branch upstream with</p>\n\n<pre><code>$ git push -u\n</code></pre>\n\n<p><code>-u</code> will track remote branch of same name. No with this configuration you will auto-guess the remote reference to git push. From <a href=\"http://git-scm.com/docs/git-config\" rel=\"noreferrer\">git.config documentation</a>:</p>\n\n<blockquote>\n  <p><strong>push.default</strong> </p>\n  \n  <p>Defines the action git push should take if no refspec is explicitly given.</p>\n  \n  <p><strong><code>push.default = current</code></strong> - push the current branch to update a branch with the \n  same name on the receiving end. Works in both central and non-central workflows.</p>\n</blockquote>\n\n<p>For me, this is a good simplification of my day-to-day Git workflow. The configuration setting takes care of the 'usual' use case where you add a branch locally and want to create it remotely. Also, I can just as easily create local branches from remotes by just doing <code>git co remote_branch_name</code> (as opposed to using <code>--set-upstream-to</code> flag). </p>\n\n<p>I know this question and the accepted answers are rather old, but the behaviour has changed so that now configuration options exists to make your workflow simpler. </p>\n\n<p>To add to your global Git configuration, run this on the command line:</p>\n\n<pre><code>$ git config --global push.default current\n</code></pre>\n",
        "source": "so",
        "questionId": 1519006
      },
      {
        "title": "How can I determine the URL that a local Git repository was originally cloned from?",
        "body": "<p>If you want only the remote URL, or referential integrity has been broken:</p>\n\n<pre><code>git config --get remote.origin.url\n</code></pre>\n\n<p>If you require full output or referential integrity is intact:</p>\n\n<pre><code>git remote show origin\n</code></pre>\n\n<p>When using <code>git clone</code> (from GitHub, or any source repository for that matter) the default name for the source of the clone is \"origin\". Using <code>git remote show</code> will display the information about this remote name. The first few lines should show:</p>\n\n<pre><code>C:\\Users\\jaredpar\\VsVim&gt; git remote show origin\n* remote origin\n  Fetch URL: git@github.com:jaredpar/VsVim.git\n  Push  URL: git@github.com:jaredpar/VsVim.git\n  HEAD branch: master\n  Remote branches:\n</code></pre>\n\n<p>If you want to use the value in the script, you would use the first command listed in this answer.</p>\n",
        "source": "so",
        "questionId": 4089430
      },
      {
        "title": "Delete commits from a branch in Git",
        "body": "<p><strong>Careful:</strong> <code>git reset --hard</code> <em>WILL DELETE YOUR WORKING DIRECTORY CHANGES</em>. Be sure to <strong>stash any local changes you want to keep</strong> before running this command.</p>\n\n<p>Assuming you are sitting on that commit, then this command will wack it...</p>\n\n<pre><code>git reset --hard HEAD~1\n</code></pre>\n\n<p>The <code>HEAD~1</code> means the commit before head.</p>\n\n<p>Or, you could look at the output of <code>git log</code>, find the commit id of the commit you want to back up to, and then do this:</p>\n\n<pre><code>git reset --hard &lt;sha1-commit-id&gt;\n</code></pre>\n\n<hr/>\n\n<p>If you already pushed it, you will need to do a force push to get rid of it...</p>\n\n<pre><code>git push origin HEAD --force\n</code></pre>\n\n<p><strong>However</strong>, if others may have pulled it, then you would be better off starting a new branch.  Because when they pull, it will just merge it into their work, and you will get it pushed back up again.</p>\n\n<p>If you already pushed, it may be better to use <code>git revert</code>, to create a \"mirror image\" commit that will undo the changes.  However, both commits will be in the log.</p>\n\n<hr />\n\n<p>FYI -- <code>git reset --hard HEAD</code> is great if you want to get rid of WORK IN PROGRESS.  It will reset you back to the most recent commit, and erase all the changes in your working tree and index.</p>\n\n<hr />\n\n<p>Lastly, if you need to find a commit that you \"deleted\", it is typically present in <code>git reflog</code> unless you have garbage collected your repository.</p>\n",
        "source": "so",
        "questionId": 1338728
      },
      {
        "title": "View the change history of a file using Git versioning",
        "body": "<p>For this I'd use:</p>\n\n<pre><code>gitk [filename]\n</code></pre>\n\n<p>or to follow filename past renames</p>\n\n<pre><code>gitk --follow [filename]\n</code></pre>\n",
        "source": "so",
        "questionId": 278192
      },
      {
        "title": "Move existing, uncommitted work to a new branch in Git",
        "body": "<p>Use the following:</p>\n\n<pre><code>git checkout -b &lt;new-branch&gt;\n</code></pre>\n\n<p>This will leave your current branch as is, create and checkout a new branch and keep all your changes. You can then make a commit with:</p>\n\n<pre><code>git add &lt;files&gt;\n</code></pre>\n\n<p>and commit to your new branch with: </p>\n\n<pre><code>git commit -m \"&lt;Brief description of this commit&gt;\"\n</code></pre>\n\n<p>The changes in the working directory and changes staged in index do not belong to any branch yet. This changes where those changes would end in.</p>\n\n<p>You don't <em>reset</em> your original branch, it stays as it is. The last commit on <code>&lt;old-branch&gt;</code> will still be the same. Therefore you <code>checkout -b</code> and then commit.</p>\n",
        "source": "so",
        "questionId": 1394797
      },
      {
        "title": "Remove a file from a Git repository without deleting it from the local filesystem",
        "body": "<p>For single file:</p>\n\n<pre><code>git rm --cached mylogfile.log\n</code></pre>\n\n<p>For single directory:</p>\n\n<pre><code>git rm --cached -r mydirectory\n</code></pre>\n",
        "source": "so",
        "questionId": 1143796
      },
      {
        "title": "Stash only one file out of multiple files that have changed with Git?",
        "body": "<p><strong>Warning</strong></p>\n\n<p>As noted in the comments, this puts everything into the stash, both staged and unstaged. The --keep-index just leaves the index alone after the stash is done. This can cause merge conflicts when you later pop the stash.</p>\n\n<hr>\n\n<p>This will stash everything that you haven't previously added. Just <code>git add</code> the things you want to keep, then run it.</p>\n\n<pre><code>git stash --keep-index\n</code></pre>\n\n<p>For example, if you want to split an old commit into more than one changeset, you can use this procedure:</p>\n\n<ol>\n<li><code>git rebase -i &lt;last good commit&gt;</code></li>\n<li>Mark some changes as <code>edit</code>.</li>\n<li><code>git reset HEAD^</code></li>\n<li><code>git add &lt;files you want to keep in this change&gt;</code></li>\n<li><code>git stash --keep-index</code></li>\n<li>Fix things up as necessary. Don't forget to <code>git add</code> any changes.</li>\n<li><code>git commit</code></li>\n<li><code>git stash pop</code></li>\n<li>Repeat, from #5, as necessary.</li>\n<li><code>git rebase --continue</code></li>\n</ol>\n",
        "source": "so",
        "questionId": 3040833
      },
      {
        "title": "Undoing a git rebase",
        "body": "<p>The easiest way would be to find the head commit of the branch as it was immediately before the rebase started in the <a href=\"https://git-scm.com/docs/git-reflog\" rel=\"noreferrer\">reflog</a>...</p>\n\n<pre><code>git reflog\n</code></pre>\n\n<p>and to reset the current branch to it (with the usual caveats about being absolutely sure before reseting with the <code>--hard</code> option).</p>\n\n<p>Suppose the old commit was <code>HEAD@{5}</code> in the ref log:</p>\n\n<pre><code>git reset --hard HEAD@{5}\n</code></pre>\n\n<p><em>In Windows, you may need to quote the reference:</em></p>\n\n<pre><code>git reset --hard \"HEAD@{5}\"\n</code></pre>\n\n<p>You can check the history of the candidate old head by just doing a <code>git log HEAD@{5}</code> (<em>Windows:</em> <code>git log \"HEAD@{5}\"</code>).</p>\n\n<p>If you've not disabled per branch reflogs you should be able to simply do <code>git reflog branchname@{1}</code> as a rebase detaches the branch head before reattaching to the final head. I would double check this, though as I haven't verified this recently.</p>\n\n<p>Per default, all reflogs are activated for non-bare repositories:</p>\n\n<pre><code>[core]\n    logAllRefUpdates = true\n</code></pre>\n",
        "source": "so",
        "questionId": 134882
      },
      {
        "title": "Find and restore a deleted file in a Git repository",
        "body": "<p>Find the last commit that affected the given path. As the file isn't in the HEAD commit, this commit must have deleted it.</p>\n\n<pre><code>git rev-list -n 1 HEAD -- &lt;file_path&gt;\n</code></pre>\n\n<p>Then checkout the version at the commit before, using the caret (<code>^</code>) symbol:</p>\n\n<pre><code>git checkout &lt;deleting_commit&gt;^ -- &lt;file_path&gt;\n</code></pre>\n\n<p>Or in one command, if <code>$file</code> is the file in question.</p>\n\n<pre><code>git checkout $(git rev-list -n 1 HEAD -- \"$file\")^ -- \"$file\"\n</code></pre>\n\n<hr>\n\n<p>If you are using zsh and have the EXTENDED_GLOB option enabled, the caret symbol won't work. You can use <code>~1</code> instead.</p>\n\n<pre><code>git checkout $(git rev-list -n 1 HEAD -- \"$file\")~1 -- \"$file\"\n</code></pre>\n",
        "source": "so",
        "questionId": 953481
      },
      {
        "title": "Difference between &quot;git add -A&quot; and &quot;git add .&quot;",
        "body": "<p><em>For <strong>Git version 2.x</strong>, see answers below too.</em></p>\n\n<hr>\n\n<p><strong>Summary:</strong></p>\n\n<ul>\n<li><p><code>git add -A</code> stages <strong>All</strong></p></li>\n<li><p><code>git add .</code> stages new and modified, <strong>without deleted</strong></p></li>\n<li><p><code>git add -u</code> stages modified and deleted, <strong>without new</strong></p></li>\n</ul>\n\n<hr>\n\n<p><strong>Detail:</strong></p>\n\n<p><code>git add -A</code> is equivalent to  <code>git add .; git add -u</code>.</p>\n\n<p>The important point about <code>git add .</code> is that it looks at the working tree and adds all those paths to the staged changes if they are either changed or are new and not ignored, it does not stage any 'rm' actions.</p>\n\n<p><code>git add -u</code> looks at all the <em>already</em> tracked files and stages the changes to those files if they are different or if they have been removed. It does not add any new files, it only stages changes to already tracked files.</p>\n\n<p><code>git add -A</code> is a handy shortcut for doing both of those.</p>\n\n<p>You can test the differences out with something like this (note that for Git version 2.x your output for <code>git add .</code> <code>git status</code> <strong>will</strong> be different):</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code>git init\necho Change me &gt; change-me\necho Delete me &gt; delete-me\ngit add change-me delete-me\ngit commit -m initial\n\necho OK &gt;&gt; change-me\nrm delete-me\necho Add me &gt; add-me\n\ngit status\n# Changed but not updated:\n#   modified:   change-me\n#   deleted:    delete-me\n# Untracked files:\n#   add-me\n\ngit add .\ngit status\n\n# Changes to be committed:\n#   new file:   add-me\n#   modified:   change-me\n# Changed but not updated:\n#   deleted:    delete-me\n\ngit reset\n\ngit add -u\ngit status\n\n# Changes to be committed:\n#   modified:   change-me\n#   deleted:    delete-me\n# Untracked files:\n#   add-me\n\ngit reset\n\ngit add -A\ngit status\n\n# Changes to be committed:\n#   new file:   add-me\n#   modified:   change-me\n#   deleted:    delete-me\n</code></pre>\n",
        "source": "so",
        "questionId": 572549
      },
      {
        "title": "Reset local repository branch to be just like remote repository HEAD",
        "body": "<p>Setting your branch to exactly match the remote branch can be done in two steps:</p>\n\n<pre><code>git fetch origin\ngit reset --hard origin/master\n</code></pre>\n\n<p>If you want to save your current branch's state before doing this (just in case), you can do:</p>\n\n<pre><code>git commit -a -m \"Saving my work, just in case\"\ngit branch my-saved-work\n</code></pre>\n\n<p>Now your work is saved on the branch \"my-saved-work\" in case you decide you want it back (or want to look at it later or diff it against your updated branch).</p>\n\n<p>Note that the first example assumes that the remote repo's name is \"origin\" and that the branch named \"master\" in the remote repo matches the currently checked-out branch in your local repo.</p>\n\n<p>BTW, this situation that you're in looks an awful lot like a common case where a push has been done into the currently checked out branch of a non-bare repository. Did you recently push into your local repo? If not, then no worries -- something else must have caused these files to unexpectedly end up modified. Otherwise, you should be aware that it's not recommended to push into a non-bare repository (and not into the currently checked-out branch, in particular).</p>\n",
        "source": "so",
        "questionId": 1628088
      },
      {
        "title": "Commit only part of a file in Git",
        "body": "<p>You can use <code>git add --patch &lt;filename&gt;</code> (or <code>-p</code> for short), and git will begin to break down your file into what it thinks are sensible \"hunks\" (portions of the file). It will then prompt you with this question:</p>\n\n<pre><code>Stage this hunk [y,n,q,a,d,/,j,J,g,s,e,?]?\n</code></pre>\n\n<p>Here is a description of each option:</p>\n\n<ul>\n<li><kbd>y</kbd> stage this hunk for the next commit</li>\n<li><kbd>n</kbd> do not stage this hunk for the next commit</li>\n<li><kbd>q</kbd> quit; do not stage this hunk or any of the remaining hunks</li>\n<li><kbd>a</kbd> stage this hunk and all later hunks in the file</li>\n<li><kbd>d</kbd> do not stage this hunk or any of the later hunks in the file</li>\n<li><kbd>g</kbd> select a hunk to go to</li>\n<li><kbd>/</kbd> search for a hunk matching the given regex</li>\n<li><kbd>j</kbd> leave this hunk undecided, see next undecided hunk</li>\n<li><kbd>J</kbd> leave this hunk undecided, see next hunk</li>\n<li><kbd>k</kbd> leave this hunk undecided, see previous undecided hunk</li>\n<li><kbd>K</kbd> leave this hunk undecided, see previous hunk</li>\n<li><kbd>s</kbd> split the current hunk into smaller hunks</li>\n<li><kbd>e</kbd> manually edit the current hunk</li>\n<li><kbd>?</kbd> print hunk help</li>\n</ul>\n\n<p>If the file is not in the repository yet, you can first do <code>git add -N &lt;filename&gt;</code>. Afterwards you can go on with <code>git add -p &lt;filename&gt;</code>.</p>\n\n<p>Afterwards, you can use:<br>\n<code>git diff --staged</code> to check that you staged correct changes<br>\n<code>git reset -p</code> to unstage mistakenly added hunks<br>\n<code>git commit -v</code> to view your commit while you edit the commit message.</p>\n\n<p>Note this is far different than the <code>git format-patch</code> command, which purpose is to parse commit data into a <code>.patch</code> files.</p>\n\n<p>Reference for future: <a href=\"https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging\" rel=\"noreferrer\">https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging</a></p>\n",
        "source": "so",
        "questionId": 1085162
      },
      {
        "title": "Ignore files that have already been committed to a Git repository",
        "body": "<p>To untrack a <em>single</em> file that has already been added/initialized to your repository, <em>i.e.</em>, stop tracking the file but not delete it from your system use: <code>git rm --cached filename</code></p>\n\n<p>To untrack <em>every</em> file that is now in your <code>.gitignore</code>:</p>\n\n<p><strong>First commit any outstanding code changes</strong>, and then, run this command: </p>\n\n<pre><code>git rm -r --cached .\n</code></pre>\n\n<p>This removes any changed files from the <em>index</em>(staging area), then just run: </p>\n\n<pre><code>git add .\n</code></pre>\n\n<p>Commit it: </p>\n\n<pre><code>git commit -m \".gitignore is now working\"\n</code></pre>\n\n<hr>\n\n<p>To undo <code>git rm --cached filename</code>, use <code>git add filename</code>.</p>\n",
        "source": "so",
        "questionId": 1139762
      },
      {
        "title": "Do a &quot;git export&quot; (like &quot;svn export&quot;)?",
        "body": "<p>Probably the simplest way to achieve this is with <a href=\"https://git-scm.com/docs/git-archive\" rel=\"noreferrer\"><code>git archive</code></a>. If you really need just the expanded tree you can do something like this.</p>\n\n<pre><code>git archive master | tar -x -C /somewhere/else\n</code></pre>\n\n<p>Most of the time that I need to 'export' something from git, I want a compressed archive in any case so I do something like this.</p>\n\n<pre><code>git archive master | bzip2 &gt;source-tree.tar.bz2\n</code></pre>\n\n<p>ZIP archive:</p>\n\n<pre><code>git archive --format zip --output /full/path/to/zipfile.zip master \n</code></pre>\n\n<p><a href=\"https://git-scm.com/docs/git-archive\" rel=\"noreferrer\"><code>git help archive</code></a> for more details, it's quite flexible.</p>\n\n<hr>\n\n<p>Note: If you are interested in exporting the index, the command is</p>\n\n<pre><code>git checkout-index -a -f --prefix=/destination/path/\n</code></pre>\n\n<p>(See <a href=\"https://stackoverflow.com/a/160719/413020\" title=\"Greg&#39;s answer\">Greg's answer</a> for more details)</p>\n",
        "source": "so",
        "questionId": 160608
      },
      {
        "title": "Squash my last X commits together using Git",
        "body": "<p>Use <code>git rebase -i &lt;after-this-commit&gt;</code> and replace \"pick\" on the second and subsequent commits with \"squash\" or \"fixup\", as described in <a href=\"http://git-scm.com/docs/git-rebase#_interactive_mode\">the manual</a>.</p>\n\n<p>In this example, <code>&lt;after-this-commit&gt;</code> is either the SHA1 hash or the relative location from the HEAD of the current branch from which commits are analyzed for the rebase command. For example, if the user wishes to view 5 commits from the current HEAD in the past the command is <code>git rebase -i HEAD~5</code>. </p>\n",
        "source": "so",
        "questionId": 5189560
      },
      {
        "title": "How to list all the files in a commit?",
        "body": "<p><strong>Preferred Way</strong> (because it's a <em>plumbing</em> command; meant to be programmatic):</p>\n\n<pre><code>$ git diff-tree --no-commit-id --name-only -r bd61ad98\nindex.html\njavascript/application.js\njavascript/ie6.js\n</code></pre>\n\n<p><strong>Another Way</strong> (less preferred for scripts, because it's a <em>porcelain</em> command; meant to be user-facing)</p>\n\n<pre><code>$ git show --pretty=\"\" --name-only bd61ad98    \nindex.html\njavascript/application.js\njavascript/ie6.js\n</code></pre>\n\n<hr>\n\n<ul>\n<li>The <code>--no-commit-id</code> suppresses the commit ID output.</li>\n<li>The <code>--pretty</code> argument specifies an empty format string to avoid the cruft at the beginning.</li>\n<li>The <code>--name-only</code> argument shows only the file names that were affected (Thanks Hank).</li>\n<li>The <code>-r</code> argument is to recurse into sub-trees</li>\n</ul>\n",
        "source": "so",
        "questionId": 424071
      },
      {
        "title": "Change the author and committer name and e-mail of multiple commits in Git",
        "body": "<p>Changing the author (or committer) would require re-writing all of the history.  If you're okay with that and think it's worth it then you should check out <a href=\"http://schacon.github.com/git/git-filter-branch.html\" rel=\"noreferrer\">git filter-branch</a>.  The man page includes several examples to get you started.  Also note that you can use environment variables to change the name of the author, committer, dates, etc. -- see the \"Environment Variables\" section of the <a href=\"http://schacon.github.com/git/git.html\" rel=\"noreferrer\">git man page</a>.</p>\n\n<p>Specifically, you can fix all the wrong author names and emails <strong>for all branches and tags</strong> with this command (source: <a href=\"https://help.github.com/articles/changing-author-info/\" rel=\"noreferrer\">GitHub help</a>):</p>\n\n<pre class=\"lang-bash prettyprint-override\"><code>#!/bin/sh\n\ngit filter-branch --env-filter '\nOLD_EMAIL=\"your-old-email@example.com\"\nCORRECT_NAME=\"Your Correct Name\"\nCORRECT_EMAIL=\"your-correct-email@example.com\"\nif [ \"$GIT_COMMITTER_EMAIL\" = \"$OLD_EMAIL\" ]\nthen\n    export GIT_COMMITTER_NAME=\"$CORRECT_NAME\"\n    export GIT_COMMITTER_EMAIL=\"$CORRECT_EMAIL\"\nfi\nif [ \"$GIT_AUTHOR_EMAIL\" = \"$OLD_EMAIL\" ]\nthen\n    export GIT_AUTHOR_NAME=\"$CORRECT_NAME\"\n    export GIT_AUTHOR_EMAIL=\"$CORRECT_EMAIL\"\nfi\n' --tag-name-filter cat -- --branches --tags\n</code></pre>\n",
        "source": "so",
        "questionId": 750172
      },
      {
        "title": "How to clone a specific Git branch?",
        "body": "<pre><code>git init\ngit remote add -t refspec remotename host:/dir.git\ngit fetch\n</code></pre>\n\n<p>But If I Remember Correctly, by default, clone fetches all branches from remote, not current working branch.</p>\n",
        "source": "so",
        "questionId": 1911109
      },
      {
        "title": "How to delete a git remote tag?",
        "body": "<p>You just need to push an 'empty' reference to the remote tag name:</p>\n\n<pre><code>git push origin :tagname\n</code></pre>\n\n<p>Or, more expressively, use the <code>--delete</code> option (or <code>-d</code> if your git version is older than 1.8.0):</p>\n\n<pre><code>git push --delete origin tagname\n</code></pre>\n\n<p>If you also need to delete the local tag, use:</p>\n\n<pre><code>git tag --delete tagname\n</code></pre>\n\n<hr>\n\n<h3>Background</h3>\n\n<p>Pushing a branch, tag, or other ref to a remote repository involves specifying \"push where, what source, what destination?\"</p>\n\n<pre><code>git push where-to-push source-ref:destination-ref\n</code></pre>\n\n<p>A real world example where you push your master branch to the origin's master branch is:</p>\n\n<pre><code>git push origin refs/heads/master:refs/heads/master\n</code></pre>\n\n<p>Which because of default paths, can be shortened to:</p>\n\n<pre><code>git push origin master:master\n</code></pre>\n\n<p>Tags work the same way:</p>\n\n<pre><code>git push origin refs/tags/release-1.0:refs/tags/release-1.0\n</code></pre>\n\n<p>Which can also be shortened to:</p>\n\n<pre><code>git push origin release-1.0:release-1.0\n</code></pre>\n\n<p>By omitting the source ref (the part before the colon), you push 'nothing' to the destination, deleting the ref on the remote end.</p>\n",
        "source": "so",
        "questionId": 5480258
      },
      {
        "title": "How do I make Git ignore file mode (chmod) changes?",
        "body": "<p>Try:</p>\n\n<pre><code>git config core.fileMode false\n</code></pre>\n\n<p>From <a href=\"https://www.kernel.org/pub/software/scm/git/docs/git-config.html\" rel=\"noreferrer\">git-config(1)</a>:</p>\n\n<blockquote>\n<pre><code>core.fileMode\n       If false, the executable bit differences between the index and the\n       working copy are ignored; useful on broken filesystems like FAT.\n       See git-update-index(1). True by default.\n</code></pre>\n</blockquote>\n\n<p>The <code>-c</code> flag can be used to set this option for one-off commands:</p>\n\n<pre><code>git -c core.fileMode=false diff\n</code></pre>\n\n<p>And the <code>--global</code> flag will make it be the default behavior for the logged in user.</p>\n\n<pre><code>git config --global core.fileMode false\n</code></pre>\n\n<h2>Warning</h2>\n\n<p><code>core.fileMode</code> is not the best practice and should be used carefully. This setting only covers the executable bit of mode and never the read/write bits. In many cases you think you need this setting because you did something like <code>chmod -R 777</code>, making all your files executable. But in most projects <strong>most files don't need and should not be executable for security reasons</strong>.</p>\n\n<p>The proper way to solve this kind of situation is to handle folder and file permission separately, with something like:</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code>find . -type d -exec chmod a+rwx {} \\; # Make folders traversable and read/write\nfind . -type f -exec chmod a+rw {} \\;  # Make files read/write\n</code></pre>\n\n<p>If you do that, you'll never need to use <code>core.fileMode</code>, except in very rare environment.</p>\n",
        "source": "so",
        "questionId": 1580596
      },
      {
        "title": "How do I make Git use the editor of my choice for commits?",
        "body": "<p>If you want to set the editor <em>only</em> for Git, do either (you don’t need both):</p>\n\n<ul>\n<li>Set <a href=\"http://git-scm.com/book/en/Customizing-Git-Git-Configuration#Basic-Client-Configuration\" rel=\"noreferrer\"><code>core.editor</code></a> in your Git config: <code>git config --global core.editor \"vim\"</code></li>\n<li>Set the <a href=\"http://git-scm.com/docs/git-var#_variables\" rel=\"noreferrer\"><code>GIT_EDITOR</code></a> environment variable: <code>export GIT_EDITOR=vim</code></li>\n</ul>\n\n<hr>\n\n<p>If you want to set the editor for Git <em>and also other programs</em>, set the standardized <code>VISUAL</code> and <code>EDITOR</code> environment variables*:</p>\n\n<pre><code>export VISUAL=vim\nexport EDITOR=\"$VISUAL\"\n</code></pre>\n\n<p><sub>* Setting both is not necessarily needed, but some programs may not use the more-correct <code>VISUAL</code>. See <a href=\"https://unix.stackexchange.com/questions/4859/visual-vs-editor-whats-the-difference\"><code>VISUAL</code> vs. <code>EDITOR</code></a>.</sub></p>\n\n<hr>\n\n<p><strong>For Sublime Text</strong>:\nAdd this to the <code>.gitconfig</code>. The <code>--wait</code> is important. (it allows to type text in sublime and will wait for save/close event.</p>\n\n<pre><code>[core]\n    editor = 'subl' --wait\n</code></pre>\n\n<p><em>'subl' can be replaced by the full path of the executable but is usually available when correctly installed.</em></p>\n",
        "source": "so",
        "questionId": 2596805
      },
      {
        "title": "I ran into a merge conflict. How can I abort the merge?",
        "body": "<p>Since your <code>pull</code> was unsuccessful then <code>HEAD</code> (not <code>HEAD^</code>) is the last \"valid\" commit on your branch:</p>\n\n<pre><code>git reset --hard HEAD\n</code></pre>\n\n<p>The other piece you want is to let their changes over-ride your changes.  </p>\n\n<p>Older versions of git allowed you to use the \"theirs\" merge strategy:</p>\n\n<pre><code>git pull --strategy=theirs remote_branch\n</code></pre>\n\n<p>But this has since been removed, as explained in <a href=\"http://marc.info/?l=git&amp;m=121637513604413&amp;w=2\" rel=\"noreferrer\">this message by Junio Hamano</a> (the Git maintainer).  As noted in <a href=\"http://marc.info/?l=git&amp;m=121637513604413&amp;w=2\" rel=\"noreferrer\">the link</a>, instead you would do this:</p>\n\n<pre><code>git fetch origin\ngit reset --hard origin\n</code></pre>\n",
        "source": "so",
        "questionId": 101752
      },
      {
        "title": "src refspec master does not match any when pushing commits in git",
        "body": "<p>Maybe you just need to commit. I ran into this when I did:</p>\n\n<pre><code>mkdir repo &amp;&amp; cd repo\ngit remote add origin /path/to/origin.git\ngit add .\n</code></pre>\n\n<p>Oops! Never committed!</p>\n\n<pre><code>git push -u origin master\nerror: src refspec master does not match any.\n</code></pre>\n\n<p>All I had to do was:</p>\n\n<pre><code>git commit -m \"initial commit\"\ngit push origin master\n</code></pre>\n\n<p>Success!</p>\n",
        "source": "so",
        "questionId": 4181861
      },
      {
        "title": "Showing which files have changed between two revisions",
        "body": "<p>To compare the current branch against <code>master</code></p>\n\n<pre><code>$ git diff --name-status master\n</code></pre>\n\n<p>To compare any pair of branches</p>\n\n<pre><code>$ git diff --name-status firstbranch..yourBranchName\n</code></pre>\n\n<p>That should do what you need, if I understand you correctly.</p>\n",
        "source": "so",
        "questionId": 822811
      },
      {
        "title": "How do you clone a Git repository into a specific folder?",
        "body": "<p><strong>Option A:</strong></p>\n\n<pre><code>git clone git@github.com:whatever folder-name\n</code></pre>\n\n<p><strong>Option B:</strong></p>\n\n<p>move the .git folder, too.</p>\n\n<p><strong>Better yet:</strong></p>\n\n<p>Keep your working copy somewhere else, and create a symbolic link.</p>\n",
        "source": "so",
        "questionId": 651038
      },
      {
        "title": "How to modify a specified commit in git?",
        "body": "<p>You can use git rebase, for example, if you want to modify back to commit <code>bbc643cd</code>, run</p>\n\n<pre><code>$ git rebase --interactive 'bbc643cd^'\n</code></pre>\n\n<p>In the default editor, modify <code>pick</code> to <code>edit</code> in the line whose commit you want to modify. Make your changes and then commit them with the same message you had before:</p>\n\n<pre><code>$ git commit --all --amend --no-edit\n</code></pre>\n\n<p>to modify the commit, and after that</p>\n\n<pre><code>$ git rebase --continue\n</code></pre>\n\n<p>to return back to the previous head commit.</p>\n\n<p><strong>WARNING</strong>: Note that this will change the SHA-1 of that commit <strong>as well as all children</strong> -- in other words, this rewrites the history from that point forward. <a href=\"https://stackoverflow.com/a/3926832/1269037\">You can break repos doing this</a> if you push using the command <code>git push --force</code></p>\n",
        "source": "so",
        "questionId": 1186535
      },
      {
        "title": "How do I show the changes which have been staged?",
        "body": "<p>It should just be:</p>\n\n<pre><code>git diff --cached\n</code></pre>\n\n<p><code>--cached</code> means show the changes in the cache/index (i.e. staged changes) against the current <code>HEAD</code>. <code>--staged</code> is a synonym for <code>--cached</code>.</p>\n\n<p><code>--staged</code> and <code>--cached</code> does not point to <code>HEAD</code>, just difference with respect to <code>HEAD</code>. If you cherry pick what to commit using <code>git add --patch</code> (or <code>git add -p</code>), <code>--staged</code> will return what is staged.</p>\n",
        "source": "so",
        "questionId": 1587846
      },
      {
        "title": "Download a specific tag with Git",
        "body": "<pre class=\"lang-bash prettyprint-override\"><code>$ git clone\n</code></pre>\n\n<p>will give you the whole repository.</p>\n\n<p>After the clone, you can list the tags with <code>$ git tag -l</code> and then checkout a specific tag:</p>\n\n<pre class=\"lang-bash prettyprint-override\"><code>$ git checkout tags/&lt;tag_name&gt;\n</code></pre>\n\n<p>Even better, checkout and create a branch (otherwise you will be on a branch named after the revision number of tag):</p>\n\n<pre class=\"lang-bash prettyprint-override\"><code>$ git checkout tags/&lt;tag_name&gt; -b &lt;branch_name&gt;\n</code></pre>\n",
        "source": "so",
        "questionId": 791959
      },
      {
        "title": "How to get the current branch name in Git?",
        "body": "<p><code>git branch</code> should show all the local branches of your repo.  The starred branch is your current branch.</p>\n",
        "source": "so",
        "questionId": 6245570
      },
      {
        "title": "Detach (move) subdirectory into separate Git repository",
        "body": "<p><strong>Update</strong>: This process is so common, that the git team made it much simpler with a new tool, <code>git subtree</code>. See here: <a href=\"https://stackoverflow.com/questions/359424/detach-subdirectory-into-separate-git-repository/17864475#17864475\">Detach (move) subdirectory into separate Git repository</a></p>\n\n<hr>\n\n<p>You want to clone your repository and then use <code>git filter-branch</code> to mark everything but the subdirectory you want in your new repo to be garbage-collected.</p>\n\n<ol>\n<li><p>To clone your local repository:</p>\n\n<pre><code>git clone /XYZ /ABC\n</code></pre>\n\n<p>(Note: the repository will be cloned using hard-links, but that is not a problem since the hard-linked files will not be modified in themselves - new ones will be created.)</p></li>\n<li><p>Now, let us preserve the interesting branches which we want to rewrite as well, and then remove the origin to avoid pushing there and to make sure that old commits will not be referenced by the origin:</p>\n\n<pre><code>cd /ABC\nfor i in branch1 br2 br3; do git branch -t $i origin/$i; done\ngit remote rm origin\n</code></pre>\n\n<p>or for all remote branches:</p>\n\n<pre><code>cd /ABC\nfor i in $(git branch -r | sed \"s/.*origin\\///\"); do git branch -t $i origin/$i; done\ngit remote rm origin\n</code></pre></li>\n<li><p>Now you might want to also remove tags which have no relation with the subproject; you can also do that later, but you might need to prune your repo again. I did not do so and got a <code>WARNING: Ref 'refs/tags/v0.1' is unchanged</code> for all tags (since they were all unrelated to the subproject); additionally, after removing such tags more space will be reclaimed. Apparently <code>git filter-branch</code> should be able to rewrite other tags, but I could not verify this. If you want to remove all tags, use <code>git tag -l | xargs git tag -d</code>.</p></li>\n<li><p>Then use filter-branch and reset to exclude the other files, so they can be pruned. Let's also add <code>--tag-name-filter cat --prune-empty</code> to remove empty commits and to rewrite tags (note that this will have to strip their signature):</p>\n\n<pre><code>git filter-branch --tag-name-filter cat --prune-empty --subdirectory-filter ABC -- --all\n</code></pre>\n\n<p>or alternatively, to only rewrite the HEAD branch and ignore tags and other branches:</p>\n\n<pre><code>git filter-branch --tag-name-filter cat --prune-empty --subdirectory-filter ABC HEAD\n</code></pre></li>\n<li><p>Then delete the backup reflogs so the space can be truly reclaimed (although now the operation is destructive)</p>\n\n<pre><code>git reset --hard\ngit for-each-ref --format=\"%(refname)\" refs/original/ | xargs -n 1 git update-ref -d\ngit reflog expire --expire=now --all\ngit gc --aggressive --prune=now\n</code></pre>\n\n<p>and now you have a local git repository of the ABC sub-directory with all its history preserved. </p></li>\n</ol>\n\n<p>Note: For most uses, <code>git filter-branch</code> should indeed have the added parameter <code>-- --all</code>. Yes that's really dash dash space dash dash <code>all</code>.  This needs to be the last parameters for the command. As Matli discovered, this keeps the project branches and tags included in the new repo.</p>\n\n<p>Edit: various suggestions from comments below were incorporated to make sure, for instance, that the repository is actually shrunk (which was not always the case before).</p>\n",
        "source": "so",
        "questionId": 359424
      },
      {
        "title": "Warning: push.default is unset; its implicit value is changing in Git 2.0",
        "body": "<p>It's explained in great detail in <a href=\"https://git-scm.com/docs/git-config.html#git-config-pushdefault\" rel=\"noreferrer\">the docs</a>, but I'll try to summarize:</p>\n\n<ul>\n<li><p><code>matching</code> means <code>git push</code> will <strong>push all your local branches</strong> to the ones with the same name on the remote. This makes it easy to accidentally push a branch you didn't intend to. </p></li>\n<li><p><code>simple</code> means <code>git push</code> will <strong>push only the current branch to the one that <code>git pull</code> would pull from</strong>, and also checks that their names match. This is a more intuitive behavior, which is why the default is getting changed to this.</p></li>\n</ul>\n\n<p>This setting only affects the behavior of your local client, and can be overridden by explicitly specifying which branches you want to push on the command line. Other clients can have different settings, <strong>it only affects what happens when you don't specify which branches you want to push</strong>.</p>\n",
        "source": "so",
        "questionId": 13148066
      },
      {
        "title": "Is there a way to skip password typing when using https:// on GitHub?",
        "body": "<h3>With Git version 1.7.9 and later</h3>\n\n<p>Since Git 1.7.9 (released in late January 2012), there is a neat mechanism in Git to avoid having to type your password all the time for HTTP / HTTPS, called <a href=\"http://www.kernel.org/pub/software/scm/git/docs/v1.7.9/gitcredentials.html\" rel=\"noreferrer\">credential helpers</a>. (Thanks to <a href=\"https://stackoverflow.com/users/109707/dazonic\">dazonic</a> for pointing out this new feature in the comments below.)</p>\n\n<p>With Git 1.7.9 or later, you can just use one of the following credential helpers:</p>\n\n<pre><code>git config --global credential.helper cache\n</code></pre>\n\n<p>... which tells Git to keep your password cached in memory for (by default) 15 minutes. You can <a href=\"http://www.kernel.org/pub/software/scm/git/docs/v1.7.9/git-credential-cache.html#_examples\" rel=\"noreferrer\">set a longer timeout</a> with:</p>\n\n<pre><code>git config --global credential.helper \"cache --timeout=3600\"\n</code></pre>\n\n<p>(That example was suggested in the <a href=\"https://help.github.com/articles/caching-your-github-password-in-git/\" rel=\"noreferrer\">GitHub help page for Linux</a>.) You can also store your credentials permanently if so desired, see the other answers below.</p>\n\n<p>GitHub's help <a href=\"https://help.github.com/articles/set-up-git#platform-mac\" rel=\"noreferrer\">also suggests</a> that if you're on Mac OS X and used <a href=\"https://en.wikipedia.org/wiki/Homebrew_%28package_management_software%29\" rel=\"noreferrer\">Homebrew</a> to install Git, you can use the native Mac OS X keystore with:</p>\n\n<pre><code>git config --global credential.helper osxkeychain\n</code></pre>\n\n<p>For Windows, there is a helper called <a href=\"https://github.com/Microsoft/Git-Credential-Manager-for-Windows\" rel=\"noreferrer\">Git Credential Manager for Windows</a> or <a href=\"https://stackoverflow.com/questions/11693074/git-credential-cache-is-not-a-git-command\">wincred in msysgit</a>.</p>\n\n<pre><code>git config --global credential.helper wincred # obsolete\n</code></pre>\n\n<p>With <a href=\"https://github.com/git-for-windows/git/releases/tag/v2.7.3.windows.1\" rel=\"noreferrer\">Git for Windows 2.7.3+</a> (March 2016):</p>\n\n<pre><code>git config --global credential.helper manager\n</code></pre>\n\n<p>For Linux, you can <a href=\"https://stackoverflow.com/questions/13385690/how-to-use-git-with-gnome-keyring-integration\">use <code>gnome-keyring</code></a>(or other keyring implementation such as KWallet).</p>\n\n<h3>With Git versions before 1.7.9</h3>\n\n<p>With versions of Git before 1.7.9, this more secure option is not available, and you'll need to change the URL that your <code>origin</code> remote uses to include the password in this fashion:</p>\n\n<pre><code>https://you:password@github.com/you/example.git\n</code></pre>\n\n<p>... in other words with <code>:password</code> after the username and before the <code>@</code>.</p>\n\n<p>You can set a new URL for your <code>origin</code> remote with:</p>\n\n<pre><code>git config remote.origin.url https://you:password@github.com/you/example.git\n</code></pre>\n\n<p>Make sure that you use <code>https</code> and you should be aware that if you do this, your GitHub password will be stored in plaintext in your <code>.git</code> directory, which is obviously undesirable.</p>\n\n<h3>With any Git version (well, since version 0.99)</h3>\n\n<p>An alternative approach is to put your username and password in your <code>~/.netrc</code> file, although, as with keeping the password in the remote URL, this means that your password will be stored on the disk in plain text and is thus less secure and not recommended. However, if you want to take this approach, add the following line to your <code>~/.netrc</code>:</p>\n\n<pre><code>machine &lt;hostname&gt; login &lt;username&gt; password &lt;password&gt;\n</code></pre>\n\n<p>... replacing <code>&lt;hostname&gt;</code> with the server's hostname, and <code>&lt;username&gt;</code> and <code>&lt;password&gt;</code> with your username and password. Also remember to set restrictive file system permissions on that file:</p>\n\n<pre><code>chmod 600 ~/.netrc\n</code></pre>\n\n<p>Note that on Windows, this file should be called <code>_netrc</code>, and you may need to define the %HOME% environment variable - for more details see:</p>\n\n<ul>\n<li><em><a href=\"https://stackoverflow.com/questions/6031214/git-how-to-use-netrc-file-on-windows-to-save-user-and-password\">Git - How to use .netrc file on windows to save user and password</a></em></li>\n</ul>\n",
        "source": "so",
        "questionId": 5343068
      },
      {
        "title": "Git fetch remote branch",
        "body": "<p>You need to create a local branch that tracks a remote branch. The following command will create a local branch named <strong>daves_branch</strong>, tracking the remote branch <strong>origin/daves_branch</strong>. When you push your changes the remote branch will be updated.</p>\n\n<p>For most versions of git:</p>\n\n<pre><code>git checkout --track origin/daves_branch\n</code></pre>\n\n<p><code>--track</code> is shorthand for <code>git checkout -b [branch] [remotename]/[branch]</code> where [remotename] is <strong>origin</strong> in this case and [branch] is twice the same, <strong>daves_branch</strong> in this case.</p>\n\n<p>For git 1.5.6.5 you needed this: </p>\n\n<pre><code>git checkout --track -b daves_branch origin/daves_branch\n</code></pre>\n\n<p>For git 1.7.2.3 and higher this is enough (might have started earlier but this is the earliest confirmation I could find quickly):</p>\n\n<pre><code>git checkout daves_branch\n</code></pre>\n\n<p>Note that with recent git versions, this command will not create a local branch and will put you in a 'detached HEAD' state. If you want a local branch, use the <code>--track</code> option.\nFull details here: <a href=\"http://git-scm.com/book/en/v2/Git-Branching-Remote-Branches#Tracking-Branches\" rel=\"noreferrer\">http://git-scm.com/book/en/v2/Git-Branching-Remote-Branches#Tracking-Branches</a></p>\n",
        "source": "so",
        "questionId": 9537392
      },
      {
        "title": "How do I revert all local changes in Git managed project to previous state?",
        "body": "<p>If you want to revert changes made to your working copy, do this:</p>\n\n<pre><code>git checkout .\n</code></pre>\n\n<p>If you want to revert changes made to the index (i.e., that you have added), do this. <strong>Warning this will reset all of your unpushed commits to master!</strong>:</p>\n\n<pre><code>git reset\n</code></pre>\n\n<p>If you want to revert a change that you have committed, do this:</p>\n\n<pre><code>git revert &lt;commit 1&gt; &lt;commit 2&gt;\n</code></pre>\n\n<p>If you want to remove untracked files (e.g., new files, generated files):</p>\n\n<pre><code>git clean -f\n</code></pre>\n\n<p>Or untracked directories (e.g., new or automatically generated directories):  </p>\n\n<pre><code>git clean -fd\n</code></pre>\n",
        "source": "so",
        "questionId": 1146973
      },
      {
        "title": "How to push a tag to a remote repository using Git?",
        "body": "<p>To push a <strong>single</strong> tag:</p>\n\n<pre><code>git push origin &lt;tag_name&gt;\n</code></pre>\n\n<p>And the following command should push <strong>all</strong> tags (not recommended):</p>\n\n<pre><code>git push --tags\n</code></pre>\n",
        "source": "so",
        "questionId": 5195859
      },
      {
        "title": "Comparing two branches in Git?",
        "body": "<pre><code>git diff branch_1..branch_2\n</code></pre>\n\n<p>That will produce the diff between the tips of the two branches. If you'd prefer to find the diff from their common ancestor to test, you can use three dots instead of two:</p>\n\n<pre><code>git diff branch_1...branch_2\n</code></pre>\n",
        "source": "so",
        "questionId": 9834689
      },
      {
        "title": "How to list only the file names that changed between two commits?",
        "body": "<pre><code>git diff --name-only SHA1 SHA2\n</code></pre>\n\n<p>where you only need to include enough of the SHA to identify the commits. You can also do, for example</p>\n\n<pre><code>git diff --name-only HEAD~10 HEAD~5\n</code></pre>\n\n<p>to see the differences between the tenth latest commit and the fifth latest (or so).</p>\n",
        "source": "so",
        "questionId": 1552340
      },
      {
        "title": "Using Git with Visual Studio",
        "body": "<p>In Jan 2013, Microsoft <a href=\"http://blogs.msdn.com/b/bharry/archive/2013/01/30/git-init-vs.aspx\" rel=\"noreferrer\">announced</a> that they are adding full Git support into all their ALM products. They have <a href=\"http://visualstudiogallery.msdn.microsoft.com/abafc7d6-dcaa-40f4-8a5e-d6724bdb980c\" rel=\"noreferrer\">published a plugin</a> for Visual Studio 2012 that adds Git source control integration.</p>\n\n<p>Alternatively, there is a project called <a href=\"http://gitextensions.github.io/\" rel=\"noreferrer\">Git Extensions</a> that includes add-ins for Visual Studio 2005, 2008, 2010 and 2012, as well as Windows Explorer integration. It's regularly updated and having used it on a couple of projects, I've found it very useful.</p>\n\n<p>Another option is <a href=\"http://gitscc.codeplex.com/\" rel=\"noreferrer\">Git Source Control Provider</a>.</p>\n",
        "source": "so",
        "questionId": 507343
      },
      {
        "title": "How to `git clone` including submodules?",
        "body": "<p>With version 2.13 of Git and later, <code>--recursive</code> has been deprecated and <code>--recurse-submodules</code> should be used instead:</p>\n\n<pre><code>git clone --recurse-submodules -j8 git://github.com/foo/bar.git\ncd bar\n</code></pre>\n\n<p><sup>Editor’s note: <code>-j8</code> is an optional performance optimization that became available in version 2.8, and fetches up to 8 submodules at a time in parallel — see <code>man git-clone</code>.</sup></p>\n\n<p>With version 1.9 of Git up until version 2.12 (<code>-j</code> flag only available in version 2.8+):</p>\n\n<pre><code>git clone --recursive -j8 git://github.com/foo/bar.git\ncd bar\n</code></pre>\n\n<p>With version 1.6.5 of Git and later, you can use:</p>\n\n<pre><code>git clone --recursive git://github.com/foo/bar.git\ncd bar\n</code></pre>\n\n<p>For already cloned repos, or older Git versions, use:</p>\n\n<pre><code>git clone git://github.com/foo/bar.git\ncd bar\ngit submodule update --init --recursive\n</code></pre>\n",
        "source": "so",
        "questionId": 3796927
      },
      {
        "title": "How to stop tracking and ignore changes to a file in Git?",
        "body": "<p>Just calling <code>git rm --cached</code> on each of the files you want to remove from revision control should be fine. As long as your local ignore patterns are correct you won't see these files included in the output of git status.</p>\n\n<p>Note that this solution removes the files from the repository, so all developers would need to maintain their own local (non-revision controlled) copies of the file</p>\n\n<p>To prevent git from detecting changes in these files you should also use this command:</p>\n\n<pre><code>git update-index --assume-unchanged [path]\n</code></pre>\n\n<p><strong>What you probably want to do:</strong> (from below <a href=\"https://stackoverflow.com/a/40272289/716435\">@Ryan Taylor answer</a>)</p>\n\n<blockquote>\n  <ol start=\"3\">\n  <li>This is to tell git you want your own independent version of the file or folder. For instance, you don't want to overwrite (or delete)\n  production/staging config files.</li>\n  </ol>\n  \n  <p><code>git update-index --skip-worktree &lt;path-name&gt;</code></p>\n</blockquote>\n\n<p>The full answer is here in this URL: <a href=\"http://source.kohlerville.com/2009/02/untrack-files-in-git/\" rel=\"noreferrer\">http://source.kohlerville.com/2009/02/untrack-files-in-git/</a></p>\n",
        "source": "so",
        "questionId": 936249
      },
      {
        "title": "How do I migrate an SVN repository with history to a new Git repository?",
        "body": "<p>Magic:</p>\n\n<pre><code>$ git svn clone http://svn/repo/here/trunk\n</code></pre>\n\n<p>Git and SVN operate very differently.  You need to learn Git, and if you want to track changes from SVN upstream, you need to learn <code>git-svn</code>.  The <code>git-svn</code> man page has a good examples section:</p>\n\n<pre><code>$ git svn --help\n</code></pre>\n",
        "source": "so",
        "questionId": 79165
      },
      {
        "title": "Best (and safest) way to merge a git branch into master",
        "body": "<p>How I would do this</p>\n\n<pre><code>git checkout master\ngit pull origin master\ngit merge test\ngit push origin master\n</code></pre>\n\n<p>If I have a local branch from a remote one, I don't feel comfortable with merging other branches than this one with the remote. Also I would not push my changes, until I'm happy with what I want to push and also I wouldn't push things at all, that are only for me and my local repository. In your description it seems, that <code>test</code> is only for you? So no reason to publish it.</p>\n\n<p>git always tries to respect yours and others changes, and so will <code>--rebase</code>. I don't think I can explain it appropriately, so have a look at <a href=\"http://git-scm.com/book/en/Git-Branching-Rebasing\" rel=\"noreferrer\">the Git book - Rebasing</a> or <a href=\"http://gitready.com/intermediate/2009/01/31/intro-to-rebase.html\" rel=\"noreferrer\">git-ready: Intro into rebasing</a> for a little description. It's a quite cool feature</p>\n",
        "source": "so",
        "questionId": 5601931
      },
      {
        "title": "How to retrieve the hash for the current commit in Git?",
        "body": "<p>To turn arbitrary extended object reference into SHA-1, use simply <strong><a href=\"http://git-scm.com/docs/git-rev-parse\" rel=\"noreferrer\" title=\"git-rev-parse - Pick out and massage parameters\">git-rev-parse</a></strong>, for example</p>\n\n<pre><code>git rev-parse HEAD\n</code></pre>\n\n<p>or</p>\n\n<pre><code>git rev-parse --verify HEAD\n</code></pre>\n\n<p><strong><em>Sidenote:</em></strong> If you want to turn <em>references</em> (<strong>branches</strong> and <strong>tags</strong>) into SHA-1, there is <code>git show-ref</code> and <code>git for-each-ref</code>.</p>\n",
        "source": "so",
        "questionId": 949314
      },
      {
        "title": "How can I remove a commit on GitHub?",
        "body": "<blockquote>\n  <p><strong>Note:</strong> please see alternative to <code>git rebase -i</code> in the comments below—</p>\n  \n  <p><code>git reset --soft HEAD^</code></p>\n</blockquote>\n\n<p>First, remove the commit on your local repository. You can do this using <code>git rebase -i</code>. For example, if it's your last commit, you can do <code>git rebase -i HEAD~2</code> and delete the second line within the editor window that pops up. </p>\n\n<p>Then, force push to GitHub by using <code>git push origin +branchName</code></p>\n\n<p>See <a href=\"http://www-cs-students.stanford.edu/~blynn/gitmagic/ch05.html#_8230_and_then_some\" rel=\"noreferrer\">Git Magic Chapter 5: Lessons of History - And Then Some</a> for more information (i.e. if you want to remove older commits).</p>\n\n<p>Oh, and if your working tree is dirty, you have to do a <code>git stash</code> first, and then a <code>git stash apply</code> after.</p>\n",
        "source": "so",
        "questionId": 448919
      },
      {
        "title": "What are the differences between .gitignore and .gitkeep?",
        "body": "<p><code>.gitkeep</code> isn’t documented, because it’s not a feature of Git.</p>\n\n<p>Git <a href=\"https://git.wiki.kernel.org/index.php/Git_FAQ#Can_I_add_empty_directories.3F\" rel=\"noreferrer\">cannot add a completely empty directory</a>. People who want to track empty directories in Git have created the convention of putting files called <code>.gitkeep</code> in these directories. The file could be called anything; Git assigns no special significance to this name.</p>\n\n<p>There is a competing convention of adding a <code>.gitignore</code> file to the empty directories to get them tracked, but some people see this as confusing since the goal is to keep the empty directories, not ignore them; <code>.gitignore</code> is also used to list files that should be ignored by Git when looking for untracked files.</p>\n",
        "source": "so",
        "questionId": 7229885
      },
      {
        "title": "Easy way to pull latest of all git submodules",
        "body": "<p>For <strong>git 1.8.2</strong> or above the option <code>--remote</code> was added to support updating to latest tips of remote branches:</p>\n\n<pre><code>git submodule update --recursive --remote\n</code></pre>\n\n<p>This has the added benefit of respecting any \"non default\" branches specified in the <code>.gitmodules</code> or <code>.git/config</code> files (if you happen to have any, default is origin/master, in which case some of the other answers here would work as well).</p>\n\n<p>For <strong>git 1.7.3</strong> or above you can use (but the below gotchas around what update does still apply):</p>\n\n<pre><code>git submodule update --recursive\n</code></pre>\n\n<p>or:</p>\n\n<pre><code>git pull --recurse-submodules\n</code></pre>\n\n<p>if you want to pull your submodules to latest commits intead of what the repo points to.</p>\n\n<p>Note: If that's <strong>the first time</strong> you checkout a repo you need to use <code>--init</code> first:</p>\n\n<pre><code>git submodule update --init --recursive\n</code></pre>\n\n<p>For <strong>older, git 1.6.1</strong> or above you can use something similar to (modified to suit):</p>\n\n<pre><code>git submodule foreach git pull origin master\n</code></pre>\n\n<p>See <a href=\"https://www.kernel.org/pub/software/scm/git/docs/git-submodule.html\" rel=\"noreferrer\">git-submodule(1)</a> for details</p>\n",
        "source": "so",
        "questionId": 1030169
      },
      {
        "title": "Viewing Unpushed Git Commits",
        "body": "<pre><code>git log origin/master..HEAD\n</code></pre>\n\n<p>You can also view the diff using the same syntax</p>\n\n<pre><code>git diff origin/master..HEAD\n</code></pre>\n",
        "source": "so",
        "questionId": 2016901
      },
      {
        "title": "How to recover a dropped stash in Git?",
        "body": "<p>If you have only just popped it and the terminal is still open, you will <a href=\"https://stackoverflow.com/questions/89332/recover-dropped-stash-in-git/7844566#7844566\">still have the hash value printed by <code>git stash pop</code> on screen</a> (thanks, Dolda).</p>\n\n<p>Otherwise, you can find it using this for Linux and Unix:</p>\n\n<pre><code>git fsck --no-reflog | awk '/dangling commit/ {print $3}'\n</code></pre>\n\n<p>and for Windows:</p>\n\n<pre><code>git fsck --no-reflog | select-string 'dangling commit' | foreach { $bits = $_ -split ' '; echo $bits[2];}\n</code></pre>\n\n<p>This will show you all the commits at the tips of your commit graph which are no longer referenced from any branch or tag – every lost commit, including every stash commit you’ve ever created, will be somewhere in that graph.</p>\n\n<p>The easiest way to find the stash commit you want is probably to pass that list to <code>gitk</code>:</p>\n\n<pre><code>gitk --all $( git fsck --no-reflog | awk '/dangling commit/ {print $3}' )\n</code></pre>\n\n<p>This will launch a repository browser showing you <em>every single commit in the repository ever</em>, regardless of whether it is reachable or not.</p>\n\n<p>You can replace <code>gitk</code> there with something like <code>git log --graph --oneline --decorate</code> if you prefer a nice graph on the console over a separate GUI app.</p>\n\n<p>To spot stash commits, look for commit messages of this form:</p>\n\n<p>&#160; &#160; &#160; &#160; WIP on <i>somebranch</i>: <i>commithash Some old commit message</i></p>\n\n<p><em>Note</em>: The commit message will only be in this form (starting with \"WIP on\") if you did not supply a message when you did <code>git stash</code>.</p>\n\n<p>Once you know the hash of the commit you want, you can apply it as a stash:</p>\n\n<pre><code>git stash apply <i>$stash_hash</i></code></pre>\n\n<p>Or you can use the context menu in <code>gitk</code> to create branches for any unreachable commits you are interested in. After that, you can do whatever you want with them with all the normal tools. When you’re done, just blow those branches away again.</p>\n",
        "source": "so",
        "questionId": 89332
      },
      {
        "title": "Make the current Git branch a master branch",
        "body": "<p>The problem with the other two answers is that the new master doesn't have the old master as an ancestor, so when you push it, everyone else will get messed up. This is what you want to do:</p>\n\n<pre><code>git checkout better_branch\ngit merge --strategy=ours master    # keep the content of this branch, but record a merge\ngit checkout master\ngit merge better_branch             # fast-forward master up to the merge\n</code></pre>\n\n<p>If you want your history to be a little clearer, I'd recommend adding some information to the merge commit message to make it clear what you've done. Change the second line to:</p>\n\n<pre><code>git merge --strategy=ours --no-commit master\ngit commit          # add information to the template merge message\n</code></pre>\n",
        "source": "so",
        "questionId": 2763006
      },
      {
        "title": "Change commit author at one specific commit",
        "body": "<p>Interactive rebase off of a point earlier in the history than the commit you need to modify (<code>git rebase -i &lt;earliercommit&gt;</code>). In the list of commits being rebased, change the text from <code>pick</code> to <code>edit</code> next to the hash of the one you want to modify. Then when git prompts you to change the commit, use this:</p>\n\n<pre><code>git commit --amend --author=\"Author Name &lt;email@address.com&gt;\"\n</code></pre>\n\n<hr>\n\n<p>For example, if your commit history is <code>A-B-C-D-E-F</code> with <code>F</code> as <code>HEAD</code>, and you want to change the author of <code>C</code> and <code>D</code>, then you would...</p>\n\n<ol>\n<li>Specify <code>git rebase -i B</code> (<a href=\"https://help.github.com/articles/about-git-rebase/#an-example-of-using-git-rebase\" rel=\"noreferrer\">here is an example of what you will see after executing the <code>git rebase -i B</code> command</a>)\n\n<ul>\n<li>if you need to edit <code>A</code>, use <code>git rebase -i --root</code></li>\n</ul></li>\n<li>change the lines for both <code>C</code> and <code>D</code> from <code>pick</code> to <code>edit</code></li>\n<li>Once the rebase started, it would first pause at <code>C</code></li>\n<li>You would <code>git commit --amend --author=\"Author Name &lt;email@address.com&gt;\"</code></li>\n<li>Then <code>git rebase --continue</code></li>\n<li>It would pause again at <code>D</code></li>\n<li>Then you would <code>git commit --amend --author=\"Author Name &lt;email@address.com&gt;\"</code> again</li>\n<li><code>git rebase --continue</code></li>\n<li>The rebase would complete.</li>\n</ol>\n",
        "source": "so",
        "questionId": 3042437
      },
      {
        "title": "How does git handle symbolic links?",
        "body": "<p>git just stores the contents of the link (i.e. the path of the file system object that it links to) in a 'blob' just like it would for a normal file. It then stores the name, mode and type (including the fact that it is a symlink) in the tree object that represents its containing directory.</p>\n\n<p>When you checkout a tree containing the link, it restores the object as a symlink regardless of whether the target file system object exists or not.</p>\n\n<p>If you delete the file that the symlink references it doesn't affect the git-controlled symlink in any way. You will have a dangling reference. It is up to the user to either remove or change the link to point to something valid if needed.</p>\n",
        "source": "so",
        "questionId": 954560
      },
      {
        "title": "Undo working copy modifications of one file in Git?",
        "body": "<p>You can use</p>\n\n<pre><code>git checkout -- file\n</code></pre>\n\n<p>You can do it without the <code>--</code> (as suggested by nimrodm), but if the filename looks like a branch or tag (or other revision identifier), it may get confused, so using <code>--</code> is best.</p>\n\n<p>You can also check out a particular version of a file:</p>\n\n<pre><code>git checkout v1.2.3 -- file         # tag v1.2.3\ngit checkout stable -- file         # stable branch\ngit checkout origin/master -- file  # upstream master\ngit checkout HEAD -- file           # the version from the most recent commit\ngit checkout HEAD^ -- file          # the version before the most recent commit\n</code></pre>\n",
        "source": "so",
        "questionId": 692246
      },
      {
        "title": "How to replace master branch in git, entirely, from another branch?",
        "body": "<p>You should be able to use the \"ours\" merge strategy to overwrite master with seotweaks like this:</p>\n\n<pre><code>git checkout seotweaks\ngit merge -s ours master\ngit checkout master\ngit merge seotweaks\n</code></pre>\n\n<p>The result should be your master is now essentially seotweaks.  </p>\n\n<p>(<code>-s ours</code> is short for <code>--strategy=ours</code>)</p>\n\n<p>From <a href=\"https://git-scm.com/docs/git-merge\" rel=\"noreferrer\">the docs</a> about the 'ours' strategy:</p>\n\n<blockquote>\n  <p>This resolves any number of heads, but the resulting tree of the merge is always that of the current branch head, effectively ignoring all changes from all other branches. It is meant to be used to supersede old development history of side branches. Note that this is different from the -Xours option to the recursive merge strategy.</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 2862590
      },
      {
        "title": "How can I reconcile detached HEAD with master/origin?",
        "body": "<p>First, let’s clarify <a href=\"https://git-scm.com/book/tr/v2/Git-Internals-Git-References\" rel=\"noreferrer\">what HEAD is</a> and what it means when it is detached.  </p>\n\n<p>HEAD is the symbolic name for the currently checked out commit. When HEAD is not detached (the “normal”<sup>1</sup> situation: you have a branch checked out), HEAD actually points to a branch’s “ref” and the branch points to the commit. HEAD is thus “attached” to a branch. When you make a new commit, the branch that HEAD points to is updated to point to the new commit. HEAD follows automatically since it just points to the branch.</p>\n\n<ul>\n<li><code>git symbolic-ref HEAD</code> yields <code>refs/heads/master</code><br>\nThe branch named “master” is checked out.</li>\n<li><code>git rev-parse refs/heads/master</code> yield <code>17a02998078923f2d62811326d130de991d1a95a</code><br>\nThat commit is the current tip or “head” of the master branch.</li>\n<li><code>git rev-parse HEAD</code> also yields <code>17a02998078923f2d62811326d130de991d1a95a</code><br>\nThis is what it means to be a “symbolic ref”. It points to an object through some other reference.<br>\n(Symbolic refs were originally implemented as symbolic links, but later changed to plain files with extra interpretation so that they could be used on platforms that do not have symlinks.)</li>\n</ul>\n\n<p>We have <code>HEAD</code> → <code>refs/heads/master</code> → <code>17a02998078923f2d62811326d130de991d1a95a</code></p>\n\n<p>When HEAD is detached, it points directly to a commit—instead of indirectly pointing to one through a branch. You can think of a detached HEAD as being on an unnamed branch. </p>\n\n<ul>\n<li><code>git symbolic-ref HEAD</code> fails with <code>fatal: ref HEAD is not a symbolic ref</code></li>\n<li><code>git rev-parse HEAD</code> yields <code>17a02998078923f2d62811326d130de991d1a95a</code><br>\nSince it is not a symbolic ref, it must point directly to the commit itself.</li>\n</ul>\n\n<p>We have <code>HEAD</code> → <code>17a02998078923f2d62811326d130de991d1a95a</code></p>\n\n<p>The important thing to remember with a detached HEAD is that if the commit it points to is otherwise unreferenced (no other ref can reach it), then it will become “dangling” when you checkout some other commit. Eventually, such dangling commits will be pruned through the garbage collection process (by default, they are kept for at least 2 weeks and may be kept longer by being referenced by HEAD’s reflog).</p>\n\n<p><sup>1</sup>\nIt is perfectly fine to do “normal” work with a detached HEAD, you just have to keep track of what you are doing to avoid having to fish dropped history out of the reflog.</p>\n\n<hr>\n\n<p>The intermediate steps of an interactive rebase are done with a detached HEAD (partially to avoid polluting the active branch’s reflog). If you finish the full rebase operation, it will update your original branch with the cumulative result of the rebase operation and reattach HEAD to the original branch. My guess is that you never fully completed the rebase process; this will leave you with a detached HEAD pointing to the commit that was most recently processed by the rebase operation.</p>\n\n<p>To recover from your situation, you should create a branch that points to the commit currently pointed to by your detached HEAD:</p>\n\n<pre><code>git branch temp\ngit checkout temp\n</code></pre>\n\n<p><sub>(these two commands can be abbreviated as <code>git checkout -b temp</code>)</sub></p>\n\n<p>This will reattach your HEAD to the new <code>temp</code> branch.</p>\n\n<p>Next, you should compare the current commit (and its history) with the normal branch on which you expected to be working:</p>\n\n<pre><code>git log --graph --decorate --pretty=oneline --abbrev-commit master origin/master temp\ngit diff master temp\ngit diff origin/master temp\n</code></pre>\n\n<p>(You will probably want to experiment with the log options: add <code>-p</code>, leave off <code>--pretty=…</code> to see the whole log message, etc.)</p>\n\n<p>If your new <code>temp</code> branch looks good, you may want to update (e.g.) <code>master</code> to point to it:</p>\n\n<pre><code>git branch -f master temp\ngit checkout master\n</code></pre>\n\n<p><sub>(these two commands can be abbreviated as <code>git checkout -B master temp</code>)</sub></p>\n\n<p>You can then delete the temporary branch:</p>\n\n<pre><code>git branch -d temp\n</code></pre>\n\n<p>Finally, you will probably want to push the reestablished history:</p>\n\n<pre><code>git push origin master\n</code></pre>\n\n<p>You may need to add <code>--force</code> to the end of this command to push if the remote branch can not be “fast-forwarded” to the new commit (i.e. you dropped, or rewrote some existing commit, or otherwise rewrote some bit of history).</p>\n\n<p>If you were in the middle of a rebase operation you should probably clean it up. You can check whether a rebase was in process by looking for the directory <code>.git/rebase-merge/</code>. You can manually clean up the in-progress rebase by just deleting that directory (e.g. if you no longer remember the purpose and context of the active rebase operation). Usually you would use <code>git rebase --abort</code>, but that does some extra resetting that you probably want to avoid (it moves HEAD back to the original branch and resets it back to the original commit, which will undo some of the work we did above).</p>\n",
        "source": "so",
        "questionId": 5772192
      },
      {
        "title": "How can I delete all Git branches which have been merged?",
        "body": "<p>UPDATE:</p>\n\n<p>You can add other branches to exclude like master and dev if your workflow has those as a possible ancestor. Usually I branch off of a \"sprint-start\" tag and master, dev and qa are not ancestors.</p>\n\n<p>To delete all local branches that are already merged into the currently checked out branch:</p>\n\n<pre><code>git branch --merged | egrep -v \"(^\\*|master|dev)\" | xargs git branch -d\n</code></pre>\n\n<p>You can see that master and dev are excluded in case they are an ancestor.</p>\n\n<hr>\n\n<p>You can delete a merged local branch with:</p>\n\n<pre><code>git branch -d branchname\n</code></pre>\n\n<p>If it's not merged, use:</p>\n\n<pre><code>git branch -D branchname\n</code></pre>\n\n<p>To delete it from the remote in old versions of Git use:</p>\n\n<pre><code>git push origin :branchname\n</code></pre>\n\n<p>In more recent versions of Git use:</p>\n\n<pre><code>git push --delete origin branchname\n</code></pre>\n\n<p>Once you delete the branch from the remote, you can prune to get rid of remote tracking branches with:</p>\n\n<pre><code>git remote prune origin\n</code></pre>\n\n<p>or prune individual remote tracking branches, as the other answer suggests, with:</p>\n\n<pre><code>git branch -dr branchname\n</code></pre>\n\n<p>Hope this helps.</p>\n",
        "source": "so",
        "questionId": 6127328
      },
      {
        "title": "How can I delete a file from git repo?",
        "body": "<p>Use <a href=\"https://git-scm.com/docs/git-rm\" rel=\"noreferrer\"><code>git rm</code></a>:</p>\n\n<pre><code>git rm file1.txt\ngit commit -m \"remove file1.txt\"\n</code></pre>\n\n<p>But if you want to remove the file only from the Git repository and not remove it from the filesystem, use:  </p>\n\n<pre><code>git rm --cached file1.txt\ngit commit -m \"remove file1.txt\"\n</code></pre>\n\n<p>And to push changes to remote repo</p>\n\n<pre><code>git push origin branch_name  \n</code></pre>\n",
        "source": "so",
        "questionId": 2047465
      },
      {
        "title": "Removing multiple files from a Git repo that have already been deleted from disk",
        "body": "<h3>For Git 1.x</h3>\n\n<pre><code>$ git add -u\n</code></pre>\n\n<p>This tells git to automatically stage tracked files -- including deleting the previously tracked files. </p>\n\n<h3>For Git 2.0</h3>\n\n<p>To stage your whole working tree:</p>\n\n<pre><code>$ git add -u :/\n</code></pre>\n\n<p>To stage just the current path:</p>\n\n<pre><code>$ git add -u .\n</code></pre>\n",
        "source": "so",
        "questionId": 492558
      },
      {
        "title": "Branch from a previous commit using Git",
        "body": "<p>You can create the branch via a hash:</p>\n\n<pre><code>git branch branchname &lt;sha1-of-commit&gt;\n</code></pre>\n\n<p>Or by using a symbolic reference:</p>\n\n<pre><code>git branch branchname HEAD~3\n</code></pre>\n",
        "source": "so",
        "questionId": 2816715
      },
      {
        "title": "When do you use git rebase instead of git merge?",
        "body": "<h2>Short Version</h2>\n\n<ul>\n<li>Merge takes all the changes in one branch and merges them into another branch in one commit.</li>\n<li>Rebase says I want the point at which I branched to move to a new starting point</li>\n</ul>\n\n<p>So when do you use either one?</p>\n\n<h3>Merge</h3>\n\n<ul>\n<li>Let's say you have created a branch for the purpose of developing a single feature.  When you want to bring those changes back to master, you probably want <strong>merge</strong> (you don't care about maintaining all of the interim commits).  </li>\n</ul>\n\n<h3>Rebase</h3>\n\n<ul>\n<li>A second scenario would be if you started doing some development and then another developer made an unrelated change.  You probably want to pull and then <strong>rebase</strong> to base your changes from the current version from the repo.</li>\n</ul>\n",
        "source": "so",
        "questionId": 804115
      },
      {
        "title": "Default behavior of &quot;git push&quot; without a branch specified",
        "body": "<p>You can control the default behavior by setting push.default in your git config. From <a href=\"http://git-scm.com/docs/git-config\" rel=\"noreferrer\">the git-config(1) documentation</a>:</p>\n\n<pre><code>push.default\n</code></pre>\n\n<p>Defines the action git push should take if no refspec is given on the command line, no refspec is configured in the remote, and no refspec is implied by any of the options given on the command line. Possible values are:</p>\n\n<ul>\n<li><p><code>nothing</code>: do not push anything</p></li>\n<li><p><code>matching</code>: push all matching branches</p>\n\n<p>All branches having the same name in both ends are considered to be matching.</p>\n\n<p>This is the default in Git 1.x.</p></li>\n<li><p><code>upstream</code>: push the current branch to its upstream branch (<code>tracking</code> is a deprecated synonym for upstream)</p></li>\n<li><p><code>current</code>: push the current branch to a branch of the same name</p></li>\n<li><p><code>simple</code>: (new in Git 1.7.11) like upstream, but refuses to push if the upstream branch's name is different from the local one</p>\n\n<p>This is the safest option and is well-suited for beginners.</p>\n\n<p>This will become the default in Git 2.0.</p></li>\n</ul>\n\n<blockquote>\n  <p>The simple, current and upstream modes are for those who want to push out a single branch after finishing work, even when the other branches are not yet ready to be pushed out</p>\n</blockquote>\n\n<p>Command line examples:</p>\n\n<p>To view the current configuration:</p>\n\n<pre><code>git config --global push.default\n</code></pre>\n\n<p>To set a new configuration:</p>\n\n<pre><code>git config --global push.default current\n</code></pre>\n",
        "source": "so",
        "questionId": 948354
      },
      {
        "title": "How to fully delete a git repository created with init?",
        "body": "<p>Git keeps all of its files in the <code>.git</code> directory. Just remove that one and init again.</p>\n\n<p>If you can't find it, it's because it is hidden.</p>\n\n<ul>\n<li><p>In Windows 7, you need to go to your folder, click on <kbd>Organize</kbd> on the top left, then click on <kbd>Folder and search options</kbd>, then click on the <kbd>View</kbd> tab and click on the <kbd>Show hidden files, folders and drives</kbd> radio button.</p></li>\n<li><p>On a Mac OS:</p>\n\n<ul>\n<li><p>Open a Terminal (via Spotlight: press <kbd>CMD + SPACE</kbd>, type <code>terminal</code> and press <kbd>Enter</kbd>) and do this command: <code>defaults write com.apple.finder AppleShowAllFiles 1 &amp;&amp; killall Finder</code>.</p></li>\n<li><p>Or you could also type <code>cd</code> (the space is important), drag and drop your git repo folder from Finder to the terminal window, press <kbd>return</kbd>, then type <code>rm -fr .git</code>, then <kbd>return</kbd> again.</p></li>\n</ul></li>\n<li><p>On Ubuntu, use shortcut <kbd>Ctrl + H</kbd>.</p></li>\n</ul>\n",
        "source": "so",
        "questionId": 1213430
      },
      {
        "title": "How do you merge two Git repositories?",
        "body": "<p>A single branch of another repository can be easily placed under a subdirectory retaining its history. For example:</p>\n\n<pre><code>git subtree add --prefix=rails git://github.com/rails/rails.git master\n</code></pre>\n\n<p>This will appear as a single commit where all files of Rails master branch are added into \"rails\" directory.\nHowever the commit's title contains a reference to the old history tree.</p>\n\n<pre><code>Add 'rails/' from commit &lt;rev&gt;\n</code></pre>\n\n<p>Where <code>&lt;rev&gt;</code> is a SHA-1 commit hash. You can still see the history, blame some changes.</p>\n\n<pre><code>git log &lt;rev&gt;\ngit blame &lt;rev&gt; -- README.md\n</code></pre>\n\n<p>Note that you can't see the directory prefix from here since this is an actual old branch left intact.\nYou should treat this like a usual file move commit: you will need an extra jump when reaching it.</p>\n\n<pre><code># finishes with all files added at once commit\ngit log rails/README.md\n\n# then continue from original tree\ngit log &lt;rev&gt; -- README.md\n</code></pre>\n\n<p>There are more complex solutions like doing this manually or rewriting the history as described in other answers.</p>\n\n<p>The git-subtree command is a part of official git-contrib, some packet managers install it by default (OS X Homebrew).\nBut you might have to install it by yourself in addition to git.</p>\n",
        "source": "so",
        "questionId": 1425892
      },
      {
        "title": "What does cherry-picking a commit with git mean?",
        "body": "<p>Cherry picking in git means to choose a commit from one branch and apply it onto another. </p>\n\n<p>This is in contrast with other ways such as <code>merge</code> and <code>rebase</code> which normally apply many commits onto another branch.</p>\n\n<ol>\n<li><p>Make sure you are on the branch you want to apply the commit to.</p>\n\n<p><code>git checkout master</code></p></li>\n<li><p>Execute the following:</p>\n\n<p><code>git cherry-pick &lt;commit-hash&gt;</code></p></li>\n</ol>\n\n<p>N.B.:</p>\n\n<ol>\n<li><p>If you cherry-pick from a public branch, you should consider using </p>\n\n<p><code>git cherry-pick -x &lt;commit-hash&gt;</code></p>\n\n<p>This will generate a standardized commit message. This way, you (and your co-workers) can still keep track of the origin of the commit and may avoid merge conflicts in the future.</p></li>\n<li><p>If you have notes attached to the commit they do not follow the cherry-pick. To bring them over as well, You have to use:</p>\n\n<p><code>git notes copy &lt;from&gt; &lt;to&gt;</code></p></li>\n</ol>\n\n<p>Additional links:</p>\n\n<ul>\n<li><a href=\"http://git-scm.com/docs/git-cherry-pick\" rel=\"noreferrer\">git official guide page</a></li>\n</ul>\n",
        "source": "so",
        "questionId": 9339429
      },
      {
        "title": "Is there a quick git command to see an old version of a file?",
        "body": "<p>You can use <code>git show</code>:</p>\n\n<pre><code>$ git show REVISION:path/to/file\n</code></pre>\n\n<p>For example, to view the version of file <code>src/main.c</code> from 4 commits ago, use:</p>\n\n<pre><code>$ git show HEAD~4:src/main.c\n</code></pre>\n\n<p>Note that the path is from the root of the repository unless it starts with ./ or ../ to indicate a relative path.  For more information, check out the man page for <a href=\"http://schacon.github.com/git/git-show.html\" rel=\"noreferrer\"><code>git-show</code></a>.</p>\n",
        "source": "so",
        "questionId": 338436
      },
      {
        "title": "How do you merge selective files with git-merge?",
        "body": "<p>You use the <a href=\"http://schacon.github.com/git/git-cherry-pick.html\" rel=\"noreferrer\">cherry-pick</a> command to get individual commits from one branch.</p>\n\n<p>If the change(s) you want are not in individual commits, then use the method shown here to <a href=\"http://plasmasturm.org/log/530/\" rel=\"noreferrer\">split the commit into individual commits</a>. Roughly speaking, you use <code>git rebase -i</code> to get the original commit to edit, then <code>git reset HEAD^</code> to selectively revert changes, then <code>git commit</code> to commit that bit as a new commit in the history.</p>\n\n<p><a href=\"http://magazine.redhat.com/2008/05/02/shipping-quality-code-with-git/\" rel=\"noreferrer\">There is another nice method here</a> in Red Hat Magazine, where they use <code>git add --patch</code> or possibly <code>git add --interactive</code> which allows you to add just parts of a hunk, if you want to split different changes to an individual file (search in that page for \"split\").</p>\n\n<p>Having split the changes, you can now cherry-pick just the ones you want.</p>\n",
        "source": "so",
        "questionId": 449541
      },
      {
        "title": "Make .gitignore ignore everything except a few files",
        "body": "<blockquote>\n  <p>An optional prefix <code>!</code> which negates the pattern; any matching file excluded by\n  a previous pattern will become included again. If a negated pattern matches,\n  this will override lower precedence patterns sources.</p>\n</blockquote>\n\n<pre class=\"lang-sh prettyprint-override\"><code># Ignore everything\n*\n\n# But not these files...\n!.gitignore\n!script.pl\n!template.latex\n# etc...\n\n# ...even if they are in subdirectories\n!*/\n\n# if the files to be tracked are in subdirectories\n!*/a/b/file1.txt\n!*/a/b/c/*\n</code></pre>\n",
        "source": "so",
        "questionId": 987142
      },
      {
        "title": "See what&#39;s in a stash without applying it",
        "body": "<p>From the <code>man git-stash</code> page: </p>\n\n<blockquote>\n  <p>The modifications stashed away by this command can be listed with git stash list,\n         inspected with git stash show</p>\n</blockquote>\n\n<pre><code>show [&lt;stash&gt;]\n       Show the changes recorded in the stash as a diff between the stashed state and\n       its original parent. When no &lt;stash&gt; is given, shows the latest one. By default,\n       the command shows the diffstat, but it will accept any format known to git diff\n       (e.g., git stash show -p stash@{1} to view the second most recent stash in patch\n       form).\n</code></pre>\n\n<p>So, to view the content of the most recent stash, run</p>\n\n<pre><code>git stash show -p\n</code></pre>\n\n<p>To view the content of an arbitrary stash, run something like</p>\n\n<pre><code>git stash show -p stash@{1}\n</code></pre>\n",
        "source": "so",
        "questionId": 10725729
      },
      {
        "title": "How to grep (search) committed code in the git history?",
        "body": "<p>To search for commit <em>content</em> (i.e., actual lines of source, as opposed to commit messages and the like), what you need to do is:</p>\n\n<pre><code>git grep &lt;regexp&gt; $(git rev-list --all)\n</code></pre>\n\n<p><strong>Updates</strong>: <code>git rev-list --all | xargs git grep expression</code> will work if you run into an \"Argument list too long\" error</p>\n\n<p>If you want to limit the search to some subtree (for instance \"lib/util\") you will need to pass that to the <code>rev-list</code> subcommand and <code>grep</code> as well:</p>\n\n<pre><code>git grep &lt;regexp&gt; $(git rev-list --all -- lib/util) -- lib/util\n</code></pre>\n\n<p>This will grep through all your commit text for regexp.</p>\n\n<p>The reason for passing the path in both commands is because <code>rev-list</code> will return the revisions list where all the changes to <code>lib/util</code> happened, but also you need to pass to <code>grep</code> so that it will only search on <code>lib/util</code>.</p>\n\n<p>Just imagine the following scenario: <code>grep</code> might find the same <code>&lt;regexp&gt;</code> on other files which are contained in the same revision returned by <code>rev-list</code> (even if there was no change to that file on that revision).</p>\n\n<p>Here are some other useful ways of searching your source:</p>\n\n<p>Search working tree for text matching regular expression regexp:</p>\n\n<pre><code>git grep &lt;regexp&gt;\n</code></pre>\n\n<p>Search working tree for lines of text matching regular expression regexp1 or regexp2:</p>\n\n<pre><code>git grep -e &lt;regexp1&gt; [--or] -e &lt;regexp2&gt;\n</code></pre>\n\n<p>Search working tree for lines of text matching regular expression regexp1 and regexp2, reporting file paths only:</p>\n\n<pre><code>git grep -e &lt;regexp1&gt; --and -e &lt;regexp2&gt;\n</code></pre>\n\n<p>Search working tree for files that have lines of text matching regular expression regexp1 and lines of text matching regular expression regexp2:</p>\n\n<pre><code>git grep -l --all-match -e &lt;regexp1&gt; -e &lt;regexp2&gt;\n</code></pre>\n\n<p>Search working tree for changed lines of text matching pattern:</p>\n\n<pre><code>git diff --unified=0 | grep &lt;pattern&gt;\n</code></pre>\n\n<p>Search all revisions for text matching regular expression regexp:</p>\n\n<pre><code>git grep &lt;regexp&gt; $(git rev-list --all)\n</code></pre>\n\n<p>Search all revisions between rev1 and rev2 for text matching regular expression regexp:</p>\n\n<pre><code>git grep &lt;regexp&gt; $(git rev-list &lt;rev1&gt;..&lt;rev2&gt;)\n</code></pre>\n",
        "source": "so",
        "questionId": 2928584
      },
      {
        "title": "Using Git and Dropbox together effectively?",
        "body": "<p>I think that Git on Dropbox is great. I use it all of the time. I have multiple computers (two at home and one at work) that I use Dropbox as a central bare repository. Since I don't want to host it on a public service, and I don't have access to a server that I can always ssh to, Dropbox takes care of this by syncing (very quickly) in the background.</p>\n\n<p>Setup is something like this:</p>\n\n<pre><code>~/project $ git init\n~/project $ git add .\n~/project $ git commit -m \"first commit\"\n~/project $ cd ~/Dropbox/git\n\n~/Dropbox/git $ git init --bare project.git\n~/Dropbox/git $ cd ~/project\n\n~/project $ git remote add origin ~/Dropbox/git/project.git\n~/project $ git push -u origin master\n</code></pre>\n\n<p>From there, you can just clone <code>~/Dropbox/git/project.git</code> that you have associated with your Dropbox account (or have shared this directory with people), you can do all the normal Git operations and they will be synchronised to all your other machines automatically.</p>\n\n<p>I wrote a blog post, <em><a href=\"http://corrupt.net/2009/08/01/On-Version-Control/\">On Version Control</a></em>, (<a href=\"http://random-rails.blogspot.com/2009/08/on-version-control.html#links\">old link</a> <sup>dead</sup>) on my reasoning and how I set up my environment, it's based on my <a href=\"http://en.wikipedia.org/wiki/Ruby_on_Rails\">Ruby on Rails</a> development experience, but it can be applied to anything, really.</p>\n",
        "source": "so",
        "questionId": 1960799
      },
      {
        "title": "What should be in my .gitignore for an Android Studio project?",
        "body": "<p><strong>Updated to Android Studio 3.0</strong>\nPlease share missing items in comments.</p>\n\n<p>A late answer but none of the answers here and <a href=\"https://stackoverflow.com/questions/16640566/which-files-shouldnt-be-checked-in-into-version-control-in-android-studio\">here</a> was right on the money for us...</p>\n\n<p>So, here's our gitignore file:</p>\n\n<pre><code>#built application files\n*.apk\n*.ap_\n\n# files for the dex VM\n*.dex\n\n# Java class files\n*.class\n\n# generated files\nbin/\ngen/\n\n# Local configuration file (sdk path, etc)\nlocal.properties\n\n# Windows thumbnail db\nThumbs.db\n\n# OSX files\n.DS_Store\n\n# Android Studio\n*.iml\n.idea\n#.idea/workspace.xml - remove # and delete .idea if it better suit your needs.\n.gradle\nbuild/\n.navigation\ncaptures/\noutput.json \n\n#NDK\nobj/\n.externalNativeBuild\n</code></pre>\n\n<p>Since Android Studio 2.2 and up to 3.0, new projects are created with this gitignore file:</p>\n\n<pre><code>*.iml\n.gradle\n/local.properties\n/.idea/workspace.xml\n/.idea/libraries\n.DS_Store\n/build\n/captures\n.externalNativeBuild\n</code></pre>\n\n<p><strong>Deprecated</strong> - for older project format, add this section to your gitignore file:</p>\n\n<pre><code>\n/*/out\n/*/*/build\n/*/*/production\n*.iws\n*.ipr\n*~\n*.swp\n</code></pre>\n\n<p>This file should be located in the project's root folder and not inside the project's module folder.</p>\n\n<p><strong>Edit Notes:</strong></p>\n\n<ol>\n<li><p>Since version 0.3+ it seems you can commit and push <strong>*.iml</strong> and <strong>build.gradle</strong> files. If your project is based on Gradle: in the new open/import dialog, you should check the <code>\"use auto import\"</code> checkbox and mark the <code>\"use default gradle wrapper (recommended)\"</code> radio button. All paths are now relative as @George suggested.</p></li>\n<li><p>Updated answer according to @128KB <a href=\"https://github.com/google/iosched/blob/master/.gitignore\" rel=\"noreferrer\">attached source</a> and @Skela suggestions</p></li>\n</ol>\n",
        "source": "so",
        "questionId": 16736856
      },
      {
        "title": ".gitignore for Visual Studio Projects and Solutions",
        "body": "<p>See the official GitHub's <a href=\"https://github.com/github/gitignore\" rel=\"noreferrer\">\"Collection of useful <em>.gitignore</em> templates\"</a>.</p>\n\n<p>The <code>.gitignore</code> for Visual Studio can be found here:<br>\n<a href=\"https://github.com/github/gitignore/blob/master/VisualStudio.gitignore\" rel=\"noreferrer\">https://github.com/github/gitignore/blob/master/VisualStudio.gitignore</a></p>\n",
        "source": "so",
        "questionId": 2143956
      },
      {
        "title": "How to compare files from two different branches?",
        "body": "<p><code>git diff</code> can show you the difference between two commits:</p>\n\n<pre><code>git diff mybranch master -- myfile.cs\n</code></pre>\n\n<p>Or, equivalently:</p>\n\n<pre><code>git diff mybranch..master -- myfile.cs\n</code></pre>\n\n<p>Using the latter syntax, if either side is <code>HEAD</code> it may be omitted (e.g. <code>master..</code> compares <code>master</code> to <code>HEAD</code>).</p>\n\n<p>You may also be interested in <code>mybranch...master</code> (from <a href=\"https://git-scm.com/docs/git-diff\" rel=\"noreferrer\"><code>git diff</code> docs</a>):</p>\n\n<blockquote>\n  <p>This form is to view the changes on the branch containing and up to the second <code>&lt;commit&gt;</code>, starting at a common ancestor of both <code>&lt;commit&gt;</code>. <code>git diff A...B</code> is equivalent to <code>git diff $(git-merge-base A B) B</code>.</p>\n</blockquote>\n\n<p>In other words, this will give a diff of changes in <code>master</code> since it diverged from <code>mybranch</code> (but without new changes since then in <code>mybranch</code>).</p>\n\n<hr>\n\n<p>In all cases, the <code>--</code> separator before the file name indicates the end of command line flags. This is optional unless Git will get confused if the argument refers to a commit or a file, but including it is not a bad habit to get into. See <a href=\"https://stackoverflow.com/a/13321491/54249\">https://stackoverflow.com/a/13321491/54249</a> for a few examples.</p>\n\n<hr>\n\n<p>The same arguments can be passed to <code>git difftool</code> if you have one configured.</p>\n",
        "source": "so",
        "questionId": 4099742
      },
      {
        "title": "Why do I need to do `--set-upstream` all the time?",
        "body": "<p>A shortcut, which doesn't depend on remembering the syntax for <code>git branch --set-upstream</code> <sup>1</sup> is to do:</p>\n\n<pre><code>git push -u origin my_branch\n</code></pre>\n\n<p>... the first time that you push that branch.  You only need to do it once, and that sets up the association between your branch and the one at <code>origin</code> in the same way as <code>git branch --set-upstream</code> does.</p>\n\n<p>Personally, I think it's a good thing to have to set up that association between your branch and one on the remote explicitly.  It's just a shame that the rules are <a href=\"http://longair.net/blog/2011/02/27/an-asymmetry-between-git-pull-and-git-push/\" rel=\"noreferrer\">different for <code>git push</code> and <code>git pull</code></a>.</p>\n\n<hr>\n\n<p><sup>1</sup> It may sound silly, but I very frequently forget to specify the current branch, assuming that's the default - it's not, and the results are most confusing :)</p>\n\n<p><em>Update 2012-10-11</em>: Apparently I'm not the only person who found it easy to get wrong! Thanks to <a href=\"https://stackoverflow.com/users/6309/vonc\">VonC</a> for pointing out that git 1.8.0 introduces the more obvious <code>git branch --set-upstream-to</code>, which can be used as follows, if you're on the branch <code>my_branch</code>:</p>\n\n<pre><code>git branch --set-upstream-to origin/my_branch\n</code></pre>\n\n<p>... or with the short option:</p>\n\n<pre><code>git branch -u origin/my_branch\n</code></pre>\n\n<p>This change, and its reasoning, is described in <a href=\"http://git.661346.n2.nabble.com/ANNOUNCE-Git-v1-8-0-rc1-tc7568792.html\" rel=\"noreferrer\">the release notes for git 1.8.0, release candidate 1</a>:</p>\n\n<blockquote>\n  <p>It was tempting to say <code>git branch --set-upstream origin/master</code>, but that tells Git to arrange the local branch <code>origin/master</code> to integrate with the currently checked out branch, which is highly unlikely what the user meant.  The option is deprecated; use the new <code>--set-upstream-to</code> (with a short-and-sweet <code>-u</code>) option instead.</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 6089294
      },
      {
        "title": ".gitignore is not working",
        "body": "<p>Fixed.  Ok, I created the .gitignore file in notepad on windows and it wasn't working.  When I viewed the .gitignore file in linux it looked like organised gibberish - perhaps notepad had written out unicode rather than ascii or whatever 8-bit is.</p>\n\n<p>So I rewrote the file on my linux box, and when I pulled it back into windows it works fine!  Hurrah!</p>\n",
        "source": "so",
        "questionId": 11451535
      },
      {
        "title": "Remove files from Git commit",
        "body": "<p>I think other answers here are wrong, because this is a question of moving the mistakenly committed files back to the staging area from the previous commit, without cancelling the changes done to them. This can be done like Paritosh Singh suggested:</p>\n\n<pre><code>git reset --soft HEAD^ \n</code></pre>\n\n<p>or</p>\n\n<pre><code>git reset --soft HEAD~1\n</code></pre>\n\n<p>Then reset the unwanted files in order to leave them out from the commit:</p>\n\n<pre><code>git reset HEAD path/to/unwanted_file\n</code></pre>\n\n<p>Now commit again, you can even re-use the same commit message:</p>\n\n<pre><code>git commit -c ORIG_HEAD  \n</code></pre>\n",
        "source": "so",
        "questionId": 12481639
      },
      {
        "title": "Add images to README.md on GitHub",
        "body": "<p>Try this markdown:</p>\n\n<pre><code>![alt text](http://url/to/img.png)\n</code></pre>\n\n<p>I think you can link directly to the raw version of an image if it's stored in your repository. i.e.</p>\n\n<pre><code>![alt text](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)\n</code></pre>\n\n<p><strong>Edit:</strong> just noticed comment linking to article which suggests using gh-pages. Also, relative links can be a better idea than the absolute URLs I posted above.</p>\n",
        "source": "so",
        "questionId": 14494747
      },
      {
        "title": "how can I git stash a specific file?",
        "body": "<p><strong>EDIT:</strong> Since git 2.13, there is a command to save a specific path to the stash: <code>git stash push &lt;path&gt;</code>. For example: <code>git stash push -m welcome_cart app/views/cart/welcome.thtml</code>.</p>\n\n<p><strong>OLD ANSWER:</strong></p>\n\n<p>You can do that using <code>git stash --patch</code> (or <code>git stash -p</code>) -- you'll enter interactive mode where you'll be presented with each hunk that was changed. Use <code>n</code> to skip the files that you don't want to stash, <code>y</code> when you encounter the one that you want to stash, and <code>q</code> to quit and leave the remaining hunks unstashed.  <code>a</code> will stash the shown hunk and the rest of the hunks in that file.</p>\n\n<p>Not the most user-friendly approach, but it gets the work done if you really need it.</p>\n",
        "source": "so",
        "questionId": 5506339
      },
      {
        "title": "How can I merge two commits into one?",
        "body": "<p>Get back to where you started with</p>\n\n<pre><code>$ git rebase --abort\n</code></pre>\n\n<p>Say your history is</p>\n\n<pre><code>$ git log --pretty=oneline\na931ac7c808e2471b22b5bd20f0cad046b1c5d0d c\nb76d157d507e819d7511132bdb5a80dd421d854f b\ndf239176e1a2ffac927d8b496ea00d5488481db5 a\n</code></pre>\n\n<p>That is, a was the first commit, then b, and finally c. After committing c we decide to squash b and c together:</p>\n\n<p>Running <code>git rebase --interactive HEAD~2</code> gives you an editor with</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code>pick b76d157 b\npick a931ac7 c\n\n# Rebase df23917..a931ac7 onto df23917\n#\n# Commands:\n#  p, pick = use commit\n#  r, reword = use commit, but edit the commit message\n#  e, edit = use commit, but stop for amending\n#  s, squash = use commit, but meld into previous commit\n#  f, fixup = like \"squash\", but discard this commit's log message\n#\n# If you remove a line here THAT COMMIT WILL BE LOST.\n# However, if you remove everything, the rebase will be aborted.\n#\n</code></pre>\n\n<p>Changing b's <code>pick</code> to <code>squash</code> will result in the error you saw, but if instead you squash c into b (newer into the older) by changing the text to</p>\n\n<pre><code>pick   b76d157 b\nsquash a931ac7 c\n</code></pre>\n\n<p>and save-quitting your editor, you'll get another editor whose contents are</p>\n\n<pre class=\"lang-sh prettyprint-override\"><code># This is a combination of 2 commits.\n# The first commit's message is:\n\nb\n\n# This is the 2nd commit message:\n\nc\n</code></pre>\n\n<p>When you save and quit, the contents of the edited file become commit message of the new combined commit:</p>\n\n<pre><code>$ git log --pretty=oneline\n18fd73d3ce748f2a58d1b566c03dd9dafe0b6b4f b and c\ndf239176e1a2ffac927d8b496ea00d5488481db5 a\n</code></pre>\n",
        "source": "so",
        "questionId": 2563632
      },
      {
        "title": "How do I clone a subdirectory only of a Git repository?",
        "body": "<p><strong>This answer is outdated and only apply to git versions lower than 1.7.0 (Feb. 2012). See below for newer versions.</strong></p>\n\n<p>No, that's not possible in Git.</p>\n\n<p>Implementing something like this in Git would be a substantial effort and it would mean that the integrity of the clientside repository could no longer be guaranteed. If you are interested, search for discussions on \"sparse clone\" and \"sparse fetch\" on the git mailinglist.</p>\n\n<p>In general, the consensus in the Git community is that if you have several directories that are always checked out independently, then these are really two different projects and should live in two different repositories. You can glue them back together using <a href=\"http://Book.Git-SCM.Com/5_submodules.html\" rel=\"noreferrer\">Git Submodules</a>.</p>\n",
        "source": "so",
        "questionId": 600079
      },
      {
        "title": "How do you rename a Git tag?",
        "body": "<p>Here is how I rename a tag <code>old</code> to <code>new</code>:</p>\n\n<pre><code>git tag new old\ngit tag -d old\ngit push origin :refs/tags/old\ngit push --tags\n</code></pre>\n\n<p>The colon in the push command removes the tag from the remote repository. If you don't do this, git will create the old tag on your machine when you pull.</p>\n\n<p>Finally, make sure that the other users remove the deleted tag. Please tell them(co-workers) to run the following command:</p>\n\n<pre><code>git pull --prune --tags\n</code></pre>\n",
        "source": "so",
        "questionId": 1028649
      },
      {
        "title": "ignoring any &#39;bin&#39; directory on a git project",
        "body": "<p>Before version 1.8.2, <code>**</code> didn't have any special meaning in the <code>.gitignore</code>. As of 1.8.2 git supports <code>**</code> to mean zero or more sub-directories (see <a href=\"https://github.com/git/git/blob/master/Documentation/RelNotes/1.8.2.txt\" rel=\"noreferrer\">release notes</a>).</p>\n\n<p>The way to ignore all directories called bin anywhere below the current level in a directory tree is with a <code>.gitignore</code> file with the pattern:</p>\n\n<pre><code>bin/\n</code></pre>\n\n<p>In the <code>man</code> page, there an example of ignoring a directory called <code>foo</code> using an analogous pattern.</p>\n\n<p><strong>Edit:</strong> \nIf you already have any bin folders in your git index which you no longer wish to track then you need to remove them explicitly. Git won't stop tracking paths that are already being tracked just because they now match a new <code>.gitignore</code> pattern. Execute a folder remove (<strong>rm</strong>) from index only (<strong>--cached</strong>) recursivelly (<strong>-r</strong>). Command line example for root bin folder:</p>\n\n<pre><code>git rm -r --cached bin\n</code></pre>\n",
        "source": "so",
        "questionId": 1470572
      },
      {
        "title": "Git diff against a stash",
        "body": "<p>See the most recent stash:</p>\n\n<pre><code>git stash show -p\n</code></pre>\n\n<p>See an arbitrary stash:</p>\n\n<pre><code>git stash show -p stash@{1}\n</code></pre>\n\n<p>From the <code>git stash</code> manpages:</p>\n\n<blockquote>\n  <p>By default, the command shows the diffstat, but it will accept any\n  format known to git diff (e.g., git stash show -p stash@{1} to view\n  the second most recent stash in patch form).</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 7677736
      },
      {
        "title": "Pretty git branch graphs",
        "body": "<p><em>Update: This answer has gotten far more attention than it deserves.  It was originally posted because I think the graphs look nice and they could be drawn-over in Illustrator for a publication– and there was no better solution.  But there now exists much more applicable answers to this Q, such as <a href=\"https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs/9074343#24107223\">fracz</a>'s, <a href=\"https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs/9074343#25468472\">Jubobs</a>', or <a href=\"https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs/9074343#21116867\">Harry Lee</a>'s!  Please go upvote those!!</em></p>\n\n<p><em>Update 2: I've posted an improved version of this answer to the <a href=\"https://stackoverflow.com/questions/1838873/visualizing-branch-topology-in-git/34467298#34467298\">Visualizing branch topology in git</a> question, since it's far more appropriate there.  That version includes</em> <code>lg3</code><em>, which shows both the author and committer info, so you really should check it out.  Leaving this answer for historical (&amp; rep, I'll admit) reasons, though I'm really tempted to just delete it.</em></p>\n\n<p><strong>2¢</strong>: I have two aliases I normally throw in my <code>~/.gitconfig</code> file:</p>\n\n<pre><code>[alias]\nlg1 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all\nlg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all\nlg = !\"git lg1\"\n</code></pre>\n\n<p><code>git lg</code>/<code>git lg1</code> looks like this:<br>\n<img src=\"https://i.stack.imgur.com/K6RFN.png\" alt=\"git lg1\"></p>\n\n<p>and <code>git lg2</code> looks like this:<br>\n<img src=\"https://i.stack.imgur.com/39dMf.png\" alt=\"git lg2\"></p>\n",
        "source": "so",
        "questionId": 1057564
      },
      {
        "title": "How can I view a git log of just one user&#39;s commits?",
        "body": "<p>This works for both <code>git log</code> and <code>gitk</code> - the 2 most common ways of viewing history. You don't need to use the whole name.</p>\n\n<pre><code>git log --author=\"Jon\"\n</code></pre>\n\n<p>will match a commit made by \"Jonathan Smith\"</p>\n\n<pre><code>git log --author=Jon\n</code></pre>\n\n<p>and</p>\n\n<pre><code>git log --author=Smith\n</code></pre>\n\n<p>would also work. The quotes are optional if you don't need any spaces.</p>\n\n<p><strong>Add <code>--all</code> if you intend to search all branches and not just the current commit's ancestors in your repo.</strong></p>\n\n<p>You can also easily match on multiple authors as regex is the underlying mechanism for this filter. So to list commits by Jonathan or Adam, you can do this:</p>\n\n<pre><code>git log --author=\"\\(Adam\\)\\|\\(Jon\\)\"\n</code></pre>\n\n<p>In order to exclude commits by a particular author or set of authors using regular expressions as noted <a href=\"https://stackoverflow.com/questions/406230/regular-expression-to-match-string-not-containing-a-word\">in this question</a>, you can use a <a href=\"http://www.regular-expressions.info/lookaround.html\" rel=\"noreferrer\">negative lookahead</a> in combination with the <code>--perl-regexp</code> switch:</p>\n\n<pre><code>git log --author='^(?!Adam|Jon).*$' --perl-regexp\n</code></pre>\n\n<p>Alternatively, you can exclude commits authored by Adam by using <code>bash</code> and piping:</p>\n\n<pre><code>git log --format='%H %an' | \n  grep -v Adam | \n  cut -d ' ' -f1 | \n  xargs -n1 git log -1\n</code></pre>\n\n<p>If you want to exclude commits commited (but not necessarily authored) by Adam, replace <code>%an</code> with <code>%cn</code>. More details about this are in my blog post here: <a href=\"http://dymitruk.com/blog/2012/07/18/filtering-by-author-name/\" rel=\"noreferrer\">http://dymitruk.com/blog/2012/07/18/filtering-by-author-name/</a></p>\n",
        "source": "so",
        "questionId": 4259996
      },
      {
        "title": "Fix a Git detached head?",
        "body": "<p>Detached head means you are no longer on a branch, you have checked out a single commit in the history (in this case the commit previous to HEAD, i.e. HEAD^).</p>\n\n<p>You only need to checkout the branch you were on, e.g. </p>\n\n<pre><code>git checkout master\n</code></pre>\n\n<p>Next time you have changed a file and want to restore it to the state it is in the index, don't delete the file first, just do</p>\n\n<pre><code>git checkout -- path/to/foo\n</code></pre>\n\n<p>This will restore the file foo to the state it is in the index. </p>\n\n<hr>\n\n<p><strong>[edit] PLEASE NOTE:</strong> The person asking the question was asking how to <em>delete</em> their changes associated with the detached HEAD. If you would like to <em>keep</em> those changes, follow these steps:</p>\n\n<ol>\n<li>Run <code>git log -n 1</code>; this will display the most recent commit on the detached HEAD. Copy-and-paste the commit hash.</li>\n<li>Run <code>git checkout master</code></li>\n<li>Run <code>git branch tmp &lt;commit-hash&gt;</code>. This will save your changes in a new branch called <code>tmp</code>.</li>\n<li>If you would like to incorporate the changes you made into <code>master</code>, run <code>git merge tmp</code> from the <code>master</code> branch. You should be on the <code>master</code> branch after running <code>git checkout master</code>.</li>\n</ol>\n",
        "source": "so",
        "questionId": 10228760
      },
      {
        "title": "How do I remove a single file from the staging area of Git but not remove it from the index or undo the changes to the file itself?",
        "body": "<p>If I understand the question correctly, you simply want to \"undo\" the <code>git add</code> that was done for that file.</p>\n\n<p>If you need to remove a <strong>single file</strong> from the staging area, use</p>\n\n<p><code>git reset HEAD -- &lt;file&gt;</code></p>\n\n<p>If you need to remove a <strong>whole directory (folder)</strong> from the staging area, use</p>\n\n<p><code>git reset HEAD -- &lt;directoryName&gt;</code></p>\n\n<p>Your modifications will be kept. When you run <code>git status</code> the file will once again show up as modified but not yet staged.</p>\n\n<p>See the <a href=\"http://schacon.github.com/git/git-reset.html\" rel=\"noreferrer\"><code>git reset</code> man page</a> for details.</p>\n",
        "source": "so",
        "questionId": 1505948
      },
      {
        "title": "How can I Remove .DS_Store files from a Git repository?",
        "body": "<p>Remove existing files from the repository:</p>\n\n<pre><code>find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch\n</code></pre>\n\n<p>Add the line</p>\n\n<pre><code>.DS_Store\n</code></pre>\n\n<p>to the file <code>.gitignore</code>, which can be found at the top level of your repository (or created if it isn't there already).  Then</p>\n\n<pre><code>git add .gitignore\ngit commit -m '.DS_Store banished!'\n</code></pre>\n",
        "source": "so",
        "questionId": 107701
      },
      {
        "title": "How do I configure git to ignore some files locally?",
        "body": "<p>From <a href=\"http://git-scm.com/docs/gitignore\" rel=\"noreferrer\">the relevant Git documentation</a>:</p>\n\n<blockquote>\n  <p>Patterns which are specific to a particular repository but which do not need to be shared with other related repositories (e.g., auxiliary files that live inside the repository but are specific to one user's workflow) should go into the <code>$GIT_DIR/info/exclude</code> file.</p>\n</blockquote>\n\n<p>The <code>.git/info/exclude</code> file has the same format as any <code>.gitignore</code> file. Another option is to set <code>core.excludesFile</code> to the name of a file containing global patterns.</p>\n\n<p>Note, if you already have unstaged changes you must run the following after editing your ignore-patterns:</p>\n\n<pre><code>git update-index --assume-unchanged [&lt;file&gt;...]\n</code></pre>\n\n<p><em>Note on <code>$GIT_DIR</code></em>: This is a notation used <a href=\"https://git-scm.com/docs/git-rev-parse#_options_for_files\" rel=\"noreferrer\">all over</a> the git manual simply to indicate the path to the git repository. If the environment variable is set, then it will override the location of whichever repo you're in, which probably isn't what you want.</p>\n",
        "source": "so",
        "questionId": 1753070
      },
      {
        "title": "Generate a git patch for a specific commit",
        "body": "<p>Try:</p>\n\n<pre><code>git <a href=\"https://www.kernel.org/pub/software/scm/git/docs/git-format-patch.html\" rel=\"noreferrer\">format-patch</a> -1 &lt;sha&gt;\n</code></pre>\n\n<p>or</p>\n\n<pre><code>git format-patch -1 HEAD\n</code></pre>\n\n<p>Apply the patch with the command:</p>\n\n<pre><code>patch -p1 &lt; file.patch\n</code></pre>\n",
        "source": "so",
        "questionId": 6658313
      },
      {
        "title": "How to see the changes in a git commit?",
        "body": "<p>To see the diff for a particular  <code>COMMIT</code> hash:</p>\n\n<p><code>git diff COMMIT^ COMMIT</code> will show you the difference between that <code>COMMIT</code>'s ancestor and the <code>COMMIT</code>. See the man pages for <a href=\"http://jk.gs/git-diff.html\">git diff</a> for details about the command and <a href=\"http://jk.gs/gitrevisions.html\">gitrevisions</a> about the <code>^</code> notation and its friends.  </p>\n\n<p>Alternatively, <code>git show COMMIT</code> will do something very similar. (The commit's data, including its diff.) See the <a href=\"http://jk.gs/git-show.html\">git show manpage</a>.</p>\n",
        "source": "so",
        "questionId": 17563726
      },
      {
        "title": "How to undo &quot;git commit --amend&quot; done instead of &quot;git commit&quot;",
        "body": "<p>What you need to do is to create a new commit with the same details as the current <code>HEAD</code> commit, but with the parent as the previous version of <code>HEAD</code>. <code>git reset --soft</code> will move the branch pointer so that the next commit happens on top of a different commit from where the current branch head is now.</p>\n\n<pre><code># Move the current head so that it's pointing at the old commit\n# Leave the index intact for redoing the commit.\n# HEAD@{1} gives you \"the commit that HEAD pointed at before \n# it was moved to where it currently points at\". Note that this is\n# different from HEAD~1, which gives you \"the commit that is the\n# parent node of the commit that HEAD is currently pointing to.\"\ngit reset --soft HEAD@{1}\n\n# commit the current tree using the commit details of the previous\n# HEAD commit. (Note that HEAD@{1} is pointing somewhere different from the\n# previous command. It's now pointing at the erroneously amended commit.)\ngit commit -C HEAD@{1}\n</code></pre>\n",
        "source": "so",
        "questionId": 1459150
      },
      {
        "title": "Ignore the .gitignore file itself",
        "body": "<p>The <code>.gitignore</code> file should be in your repository, so it should indeed be added and committed in, as <code>git status</code> suggests. It has to be a part of the repository tree, so that changes to it can be merged and so on.</p>\n\n<p>So, add it to your repository, it should not be gitignored.</p>\n\n<p>If you really want you can add <code>.gitignore</code> to the <code>.gitignore</code> file if you don't want it to be committed. However, in that case it's probably better to add the ignores to <code>.git/info/exclude</code>, a special checkout-local file that works just like .gitignore but does not show up in \"git status\" since it's in the <code>.git</code> folder.</p>\n\n<p>See also <a href=\"https://help.github.com/articles/ignoring-files\" rel=\"noreferrer\">https://help.github.com/articles/ignoring-files</a></p>\n",
        "source": "so",
        "questionId": 767147
      },
      {
        "title": "Git workflow and rebase vs merge questions",
        "body": "<p>\"Conflicts\" mean \"parallel evolutions of a same content\". So if it goes \"all to hell\" during a merge, it means you have massive evolutions on the same set of files.</p>\n\n<p>The reason why a rebase is then better than a merge is that:</p>\n\n<ul>\n<li>you rewrite your local commit history with the one of the master (and then reapply your work, resolving any conflict then)</li>\n<li>the final merge will certainly be a \"fast forward\" one, because it will have all the commit history of the master, plus only your changes to reapply.</li>\n</ul>\n\n<p>I confirm that the correct workflow in that case (evolutions on common set of files) is <strong>rebase first, then merge</strong>.</p>\n\n<p>However, that means that, if you push your local branch (for backup reason), that branch should not be pulled (or at least used) by anyone else (since the commit history will be rewritten by the successive rebase).</p>\n\n<hr>\n\n<p>On that topic (rebase then merge workflow), <a href=\"https://stackoverflow.com/users/207119/barraponto\">barraponto</a> mentions in the comments two interesting posts, both from <a href=\"http://www.randyfay.com/\" rel=\"noreferrer\">randyfay.com</a>:</p>\n\n<ul>\n<li><a href=\"http://www.randyfay.com/node/91\" rel=\"noreferrer\"><strong>A Rebase Workflow for Git</strong></a>: reminds us to fetch first, rebase:</li>\n</ul>\n\n<blockquote>\n  <p>Using this technique, your work always goes on top of the public branch like a patch that is up-to-date with current <code>HEAD</code>. </p>\n</blockquote>\n\n<p>(a similar technique <a href=\"http://fourkitchens.com/blog/2009/04/20/alternatives-rebasing-bazaar\" rel=\"noreferrer\">exists for bazaar</a>)</p>\n\n<ul>\n<li><a href=\"http://www.randyfay.com/node/89\" rel=\"noreferrer\"><strong>Avoiding Git Disasters: A Gory Story</strong></a>: about the dangers of <code>git push --force</code> (instead of a <code>git pull --rebase</code> for instance)</li>\n</ul>\n",
        "source": "so",
        "questionId": 457927
      },
      {
        "title": "git: undo all working dir changes including new files",
        "body": "<pre><code>git reset --hard # removes staged and working directory changes\n\n## !! be very careful with these !!\n## you may end up deleting what you don't want to\n## read comments and manual.\ngit clean -f -d # remove untracked\ngit clean -f -x -d # CAUTION: as above but removes ignored files like config.\ngit clean -fxd :/ # CAUTION: as above, but cleans untracked and ignored files through the entire repo (without :/, the operation affects only the current directory)\n</code></pre>\n",
        "source": "so",
        "questionId": 1090309
      },
      {
        "title": "How can I undo git reset --hard HEAD~1?",
        "body": "<p>Pat Notz is correct.  You can get the commit back so long as it's been within a few days.  git only garbage collects after about a month or so unless you explicitly tell it to remove newer blobs.</p>\n\n<pre><code>$ git init\nInitialized empty Git repository in .git/\n\n$ echo \"testing reset\" &gt; file1\n$ git add file1\n$ git commit -m 'added file1'\nCreated initial commit 1a75c1d: added file1\n 1 files changed, 1 insertions(+), 0 deletions(-)\n create mode 100644 file1\n\n$ echo \"added new file\" &gt; file2\n$ git add file2\n$ git commit -m 'added file2'\nCreated commit f6e5064: added file2\n 1 files changed, 1 insertions(+), 0 deletions(-)\n create mode 100644 file2\n\n$ git reset --hard HEAD^\nHEAD is now at 1a75c1d... added file1\n\n$ cat file2\ncat: file2: No such file or directory\n\n$ git reflog\n1a75c1d... HEAD@{0}: reset --hard HEAD^: updating HEAD\nf6e5064... HEAD@{1}: commit: added file2\n\n$ git reset --hard f6e5064\nHEAD is now at f6e5064... added file2\n\n$ cat file2\nadded new file\n</code></pre>\n\n<p>You can see in the example that the file2 was removed as a result of the hard reset, but was put back in place when I reset via the reflog.</p>\n",
        "source": "so",
        "questionId": 5473
      },
      {
        "title": "How do you stash an untracked file?",
        "body": "<p><strong><a href=\"http://web.archive.org/web/20140310215100/http://blog.icefusion.co.uk:80/git-stash-can-delete-ignored-files-git-stash-u/\" rel=\"noreferrer\">Warning, doing this will permanently delete your files if you have any directory/* entries in your gitignore file.</a></strong></p>\n\n<p>As of version 1.7.7 you can use <code>git stash --include-untracked</code> or <code>git stash save -u</code> to stash untracked files without staging them.</p>\n\n<p>Add (<code>git add</code>) the file and start tracking it. Then stash. Since the entire contents of the file are new, they will be stashed, and you can manipulate it as necessary.</p>\n",
        "source": "so",
        "questionId": 835501
      },
      {
        "title": "How can I delete all of my Git stashes at once?",
        "body": "<p>It does what you need:</p>\n\n<pre><code>git stash clear\n</code></pre>\n\n<p>From the <a href=\"http://www.kernel.org/pub/software/scm/git/docs/git-stash.html\" rel=\"noreferrer\">git documentation</a>:</p>\n\n<blockquote>\n  <p><strong><code>clear</code></strong></p>\n  \n  <p>Remove all the stashed states. Note that those states will then be subject to pruning, and may be impossible to recover (...).</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 11369375
      },
      {
        "title": "Git push error &#39;[remote rejected] master -&gt; master (branch is currently checked out)&#39;",
        "body": "<p>You can simply convert your remote repository to bare repository (there is no working copy in the bare repository - the folder contains only the actual repository data).</p>\n\n<p>Execute the following command in your remote repository folder:</p>\n\n<pre><code>git config --bool core.bare true\n</code></pre>\n\n<p>Then delete all the files except <code>.git</code> in that folder. And then you will be able to perform <code>git push</code> to the remote repository without any errors.</p>\n",
        "source": "so",
        "questionId": 2816369
      },
      {
        "title": "How to name and retrieve a stash by name in git?",
        "body": "<p>You can actually find the stash by name using git's regular expression syntax for addressing objects:</p>\n\n<pre><code>stash^{/&lt;regex&gt;}\n:/&lt;regex&gt;\n</code></pre>\n\n<p>For example, when saving your stash with a save name:</p>\n\n<pre><code>git stash save \"guacamole sauce WIP\"\n</code></pre>\n\n<p>... you can use a regular expression to address that stash:</p>\n\n<pre><code>git stash apply stash^{/guacamo}\n</code></pre>\n\n<p>This will apply the youngest stash that matches the regular expression <code>guacamo</code>. That way, you don't have to know what number the stash is at in the stack, you just have to know its name. There is no terser syntax for this, but you can create an alias in your <code>.gitconfig</code> file:</p>\n\n<pre><code>[alias]\nsshow = \"!f() { git stash show stash^{/$*} -p; }; f\"\nsapply = \"!f() { git stash apply stash^{/$*}; }; f\"\n</code></pre>\n\n<p>You can then use <code>git sapply &lt;regex&gt;</code> to apply that stash (without dropping).<br> You can then use <code>git sshow &lt;regex&gt;</code> to show: files changed, insertions, and deletions</p>\n\n<p><strong>EDIT:</strong> Props to <a href=\"https://stackoverflow.com/a/3322412/46588\">this StackOverflow answer</a> on how to use bash arguments in git aliases.</p>\n\n<p><strong>EDIT 2:</strong> This answer used to contain <code>drop</code> and <code>list</code> aliases, but I've since removed them, since <code>drop</code> requires the <code>stash@{n}</code> syntax while <code>list</code> didn't filter the stashes at all. If anyone knows how to resolve a stash SHA-1 hash to a stash ref, then I could implement the other commands as well.</p>\n\n<p><strong>EDIT 3:</strong> Per <a href=\"https://stackoverflow.com/users/349555/isyi\">isyi</a>'s suggestion I've added a patch flag to show what the contents of the stash are when showing one.</p>\n",
        "source": "so",
        "questionId": 11269256
      },
      {
        "title": "How to fetch all git branches?",
        "body": "<p><sup>I've written my answer some time ago and last downvote motivated me to update it with my later experience :-)</sup></p>\n\n<p><sup>Edit: previous version of this answer created branches with 'origin' prefix, all pointing to master branch, instead of actual branches, and having problems with variable expansions. This has been fixed as per comments.</sup></p>\n\n<p>You can fetch one branch from all remotes like this:</p>\n\n<pre><code>git fetch --all\n</code></pre>\n\n<p><code>fetch</code> updates local copies of remote branches so this is always safe for your local branches <strong>BUT</strong>:</p>\n\n<ol>\n<li><p><code>fetch</code> will not <strong>update</strong> local branches (which <strong>track</strong> remote branches); If you want to update your local branches you still need to pull every branch. </p></li>\n<li><p><code>fetch</code> will not <strong>create</strong> local branches (which <strong>track</strong> remote branches), you have to do this manually. If you want to list all remote branches:\n<code>git branch -a</code></p></li>\n</ol>\n\n<p>To <strong>update</strong> local branches which track remote branches:</p>\n\n<pre><code>git pull --all\n</code></pre>\n\n<p>However, this can be still insufficient. It will work only for your local branches which track remote branches. To track all remote branches execute this oneliner <strong>BEFORE</strong> <code>git pull --all</code>:</p>\n\n<pre><code>git branch -r | grep -v '\\-&gt;' | while read remote; do git branch --track \"${remote#origin/}\" \"$remote\"; done\n</code></pre>\n\n<h3>TL;DR version</h3>\n\n<pre><code>git branch -r | grep -v '\\-&gt;' | while read remote; do git branch --track \"${remote#origin/}\" \"$remote\"; done\ngit fetch --all\ngit pull --all\n</code></pre>\n\n<p>(it seems that pull fetches all branches from all remotes, but I always fetch first just to be sure)</p>\n\n<p>Run the first command only if there are remote branches on the server that aren't tracked by your local branches.</p>\n\n<p>P.S. AFAIK <code>git fetch --all</code> and <code>git remote update</code> are equivalent.</p>\n\n<hr>\n\n<hr>\n\n<p>Kamil Szot's <a href=\"https://stackoverflow.com/questions/10312521/how-to-fetch-all-git-branches#comment27984640_10312587\">comment</a>, which 74 (at least) people found useful.</p>\n\n<blockquote>\n  <p>I had to use:</p>\n\n<pre><code>for remote in `git branch -r`; do git branch --track ${remote#origin/} $remote; done\n</code></pre>\n  \n  <p>because your code created local branches named <code>origin/branchname</code> and\n  I was getting \"refname 'origin/branchname' is ambiguous whenever I\n  referred to it.</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 10312521
      },
      {
        "title": "Throw away local commits in git",
        "body": "<p>If your excess commits are only visible to you, you can just do <code>git reset --hard origin/&lt;branch_name&gt;</code> to move back to where the origin is.</p>\n\n<p>Doing a <code>git revert</code> makes <em>new</em> commits to remove <em>old</em> commits in a way that keeps everyone's history sane.</p>\n",
        "source": "so",
        "questionId": 5097456
      },
      {
        "title": "Git for beginners: The definitive practical guide",
        "body": "<h1>How do you create a new project/repository?</h1>\n\n<p>A git repository is simply a directory containing a special <code>.git</code> directory.</p>\n\n<p>This is different from \"centralised\" version-control systems (like subversion), where a \"repository\" is hosted on a remote server, which you <code>checkout</code> into a \"working copy\" directory. With git, your working copy <em>is</em> the repository.</p>\n\n<p>Simply run <code>git init</code> in the directory which contains the files you wish to track.</p>\n\n<p>For example,</p>\n\n<pre><code>cd ~/code/project001/\ngit init\n</code></pre>\n\n<p>This creates a <code>.git</code> (hidden) folder in the current directory.</p>\n\n<p>To make a new project, run <code>git init</code> with an additional argument (the name of the directory to be created):</p>\n\n<pre><code>git init project002\n\n(This is equivalent to: mkdir project002 &amp;&amp; cd project002 &amp;&amp; git init)\n</code></pre>\n\n<p>To check if the current current path is within a git repository, simply run <code>git status</code> - if it's not a repository, it will report \"fatal: Not a git repository\"</p>\n\n<p>You could also list the <code>.git</code> directory, and check it contains files/directories similar to the following:</p>\n\n<pre><code>$ ls .git\nHEAD         config       hooks/       objects/\nbranches/    description  info/        refs/\n</code></pre>\n\n<hr>\n\n<p>If for whatever reason you wish to \"de-git\" a repository (you wish to stop using git to track that project). Simply remove the <code>.git</code> directory at the base level of the repository.</p>\n\n<pre><code>cd ~/code/project001/\nrm -rf .git/\n</code></pre>\n\n<p><strong>Caution:</strong> This will destroy <em>all</em> revision history, <em>all</em> your tags, <em>everything</em> git has done. It will not touch the \"current\" files (the files you can currently see), but previous changes, deleted files and so on will be unrecoverable!</p>\n",
        "source": "so",
        "questionId": 315911
      },
      {
        "title": "How do I properly force a Git push?",
        "body": "<p>Just do:</p>\n\n<pre><code>git push origin &lt;your_branch_name&gt; --force\n</code></pre>\n\n<p>or if you have a specific repo:</p>\n\n<pre><code>git push https://git.... --force\n</code></pre>\n\n<p>This will delete your previous commit(s) and push your current one.</p>\n\n<p>It may not be proper, but if anyone stumbles upon this page, thought they might want a simple solution...</p>\n\n<h3>Short flag</h3>\n\n<p>Also note that <code>-f</code> is short for <code>--force</code>, so</p>\n\n<pre><code>git push origin &lt;your_branch_name&gt; -f\n</code></pre>\n\n<p>will also work.</p>\n",
        "source": "so",
        "questionId": 5509543
      },
      {
        "title": "How to remove a directory from git repository?",
        "body": "<h1>Remove directory from git and local</h1>\n\n<p>You could checkout 'master' with both directories; </p>\n\n<pre><code>git rm -r one-of-the-directories\ngit commit -m \"Remove duplicated directory\"\ngit push origin &lt;your-git-branch&gt; (typically 'master', but not always)\n</code></pre>\n\n<h1>Remove directory from git but NOT local</h1>\n\n<p>As mentioned in the comments, what you usually want to do is remove this directory from git but not delete it entirely from the filesystem (local)</p>\n\n<p>In that case use:  </p>\n\n<pre><code>git rm -r --cached myFolder\n</code></pre>\n",
        "source": "so",
        "questionId": 6313126
      },
      {
        "title": "How do I diff the same file between two different commits on the same branch?",
        "body": "<p>From the <a href=\"https://www.kernel.org/pub/software/scm/git/docs/git-diff.html\" rel=\"noreferrer\" title=\"Kernel.org version of git-diff manpage\"><code>git-diff</code></a> manpage:</p>\n\n<pre><code>git diff [--options] &lt;commit&gt; &lt;commit&gt; [--] [&lt;path&gt;...]\n</code></pre>\n\n<p>For instance, to see the difference for a file \"main.c\" between now and two commits back, here are three equivalent commands:</p>\n\n<pre><code>$ git diff HEAD^^ HEAD main.c\n$ git diff HEAD^^..HEAD -- main.c\n$ git diff HEAD~2 HEAD -- main.c\n</code></pre>\n",
        "source": "so",
        "questionId": 3338126
      },
      {
        "title": "How to list branches that contain a given commit?",
        "body": "<p>From the <a href=\"http://www.kernel.org/pub/software/scm/git/docs/git-branch.html\" rel=\"noreferrer\">git-branch manual page</a>:</p>\n\n<pre><code> git branch --contains &lt;commit&gt;\n</code></pre>\n\n<blockquote>\n  <p>Only list branches which contain the specified commit (HEAD if not specified). Implies <code>--list</code>.</p>\n</blockquote>\n\n<hr>\n\n<pre><code> git branch -r --contains &lt;commit&gt;\n</code></pre>\n\n<p>Lists <strong><a href=\"https://stackoverflow.com/a/4697054/6309\">remote tracking branches</a></strong> as well (as mentioned in <a href=\"https://stackoverflow.com/users/3941992/user3941992\">user3941992</a>'s <a href=\"https://stackoverflow.com/a/25311972/6309\">answer</a> below) that is \"local branches that have a direct relationship to a remote branch\".</p>\n\n<hr>\n\n<p>See also this <a href=\"http://www.gitready.com/intermediate/2009/04/03/find-ancestor-commits.html\" rel=\"noreferrer\">git ready</a> article.</p>\n\n<blockquote>\n  <p>The <code>--contains</code> tag will figure out if a certain commit has been brought in yet into your branch. Perhaps you’ve got a commit SHA from a patch you thought you had applied, or you just want to check if commit for your favorite open source project that reduces memory usage by 75% is in yet.</p>\n</blockquote>\n\n<pre><code>$ git log -1 tests\ncommit d590f2ac0635ec0053c4a7377bd929943d475297\nAuthor: Nick Quaranto &lt;nick@quaran.to&gt;\nDate:   Wed Apr 1 20:38:59 2009 -0400\n\n    Green all around, finally.\n\n$ git branch --contains d590f2\n  tests\n* master\n</code></pre>\n\n<hr>\n\n<p>Note: <strong>if the commit is on a <a href=\"https://stackoverflow.com/a/1070851/6309\">remote tracking branch</a>, add the <code>-a</code> option</strong>.<br>\n(as <a href=\"https://stackoverflow.com/users/114904/michielb\">MichielB</a> comments <a href=\"https://stackoverflow.com/questions/1419623/how-to-list-branches-that-contain-a-given-commit/1419637#comment27176667_1419637\">below</a>)</p>\n\n<pre><code>git branch -a --contains &lt;commit&gt;\n</code></pre>\n\n<hr>\n\n<p><a href=\"https://stackoverflow.com/users/65977/matrixfrog\">MatrixFrog</a> comments that it only shows which branches contain that <em>exact</em> commit.<br>\nIf you want to know which branches contain an \"equivalent\" commit (i.e. which branches have cherry-picked that commit) that's <strong><a href=\"http://www.kernel.org/pub/software/scm/git/docs/git-cherry.html\" rel=\"noreferrer\"><code>git cherry</code></a></strong>:</p>\n\n<blockquote>\n  <p>Because <code>git cherry</code> <strong>compares the changeset rather than the commit id (sha1)</strong>, you can use <code>git cherry</code> to find out if a commit you made locally has been applied <code>&lt;upstream&gt;</code> under a different commit id.<br>\n  For example, this will happen if you’re feeding patches <code>&lt;upstream&gt;</code> via email rather than pushing or pulling commits directly.</p>\n</blockquote>\n\n<pre><code>           __*__*__*__*__&gt; &lt;upstream&gt;\n          /\nfork-point\n          \\__+__+__-__+__+__-__+__&gt; &lt;head&gt;\n</code></pre>\n\n<p>(Here, the commits marked '<code>-</code>' wouldn't show up with <code>git cherry</code>, meaning they are already present in <code>&lt;upstream&gt;</code>.)</p>\n",
        "source": "so",
        "questionId": 1419623
      },
      {
        "title": "Permission denied (publickey) when deploying heroku code. fatal: The remote end hung up unexpectedly",
        "body": "<p>You have to upload your public key to Heroku:</p>\n\n<pre><code>heroku keys:add ~/.ssh/id_rsa.pub\n</code></pre>\n\n<p>If you don't have a public key, Heroku will prompt you to add one automatically which works seamlessly. Just use: </p>\n\n<pre><code>heroku keys:add\n</code></pre>\n\n<p>To clear all your previous keys do :</p>\n\n<pre><code>heroku keys:clear\n</code></pre>\n\n<p>To display all your existing keys do :</p>\n\n<pre><code>heroku keys\n</code></pre>\n\n<p>EDIT:</p>\n\n<p>The above did not seem to work for me. I had messed around with the <code>HOME</code> environment variable and so SSH was searching for keys in the wrong directory.</p>\n\n<p>To ensure that SSH checks for the key in the correct directory do :</p>\n\n<pre><code>ssh -vT git@heroku.com\n</code></pre>\n\n<p>Which will display the following ( Sample ) lines</p>\n\n<pre><code>OpenSSH_4.6p1, OpenSSL 0.9.8e 23 Feb 2007\ndebug1: Connecting to heroku.com [50.19.85.156] port 22.\ndebug1: Connection established.\ndebug1: identity file /c/Wrong/Directory/.ssh/identity type -1\ndebug1: identity file /c/Wrong/Directory/.ssh/id_rsa type -1\ndebug1: identity file /c/Wrong/Directory/.ssh/id_dsa type -1\ndebug1: Remote protocol version 2.0, remote software version Twisted\ndebug1: no match: Twisted\ndebug1: Enabling compatibility mode for protocol 2.0\ndebug1: Local version string SSH-2.0-OpenSSH_4.6\ndebug1: SSH2_MSG_KEXINIT sent\ndebug1: SSH2_MSG_KEXINIT received\ndebug1: kex: server-&gt;client aes128-cbc hmac-md5 none\ndebug1: kex: client-&gt;server aes128-cbc hmac-md5 none\ndebug1: sending SSH2_MSG_KEXDH_INIT\ndebug1: expecting SSH2_MSG_KEXDH_REPLY\ndebug1: Host 'heroku.com' is known and matches the RSA host key.\ndebug1: Found key in /c/Wrong/Directory/.ssh/known_hosts:1\ndebug1: ssh_rsa_verify: signature correct\ndebug1: SSH2_MSG_NEWKEYS sent\ndebug1: expecting SSH2_MSG_NEWKEYS\ndebug1: SSH2_MSG_NEWKEYS received\ndebug1: SSH2_MSG_SERVICE_REQUEST sent\ndebug1: SSH2_MSG_SERVICE_ACCEPT received\ndebug1: Authentications that can continue: publickey\ndebug1: Next authentication method: publickey\ndebug1: Trying private key: /c/Wrong/Directory/.ssh/identity\ndebug1: Trying private key: /c/Wrong/Directory/.ssh/id_rsa\ndebug1: Trying private key: /c/Wrong/Directory/.ssh/id_dsa\ndebug1: No more authentication methods to try.\n</code></pre>\n\n<p><strong><code>Permission denied (publickey).</code></strong></p>\n\n<p>From the above you could observe that ssh looks for the keys in the <code>/c/Wrong/Directory/.ssh</code> directory which is not where we have the public keys that we just added to heroku ( using <code>heroku keys:add ~/.ssh/id_rsa.pub</code> ) ( <strong>Please note that in windows OS <code>~</code> refers to the <code>HOME</code> path which in win 7 / 8 is <code>C:\\Users\\UserName</code></strong> )</p>\n\n<p>To view your current home directory do : <code>echo $HOME</code> or <code>echo %HOME%</code> ( Windows )</p>\n\n<p>To set your <code>HOME</code> directory correctly ( by correctly I mean the parent directory of <code>.ssh</code> directory, so that ssh could look for keys in the correct directory ) refer these links :</p>\n\n<ol>\n<li><p><a href=\"https://unix.stackexchange.com/questions/21598/how-do-i-set-a-user-environment-variable-permanently-not-session\">SO Answer on how to set Unix environment variable permanently</a></p></li>\n<li><p><a href=\"https://stackoverflow.com/questions/2840871/ssh-is-looking-in-the-wrong-place-for-the-public-private-key-pair-on-windows\">SO Question regarding ssh looking for keys in the wrong directory and a solution for the same.</a></p></li>\n</ol>\n",
        "source": "so",
        "questionId": 4269922
      },
      {
        "title": "How can I get a list of git branches, ordered by most recent commit?",
        "body": "<p>Use <strong><code>--sort=-committerdate</code></strong> option of <a href=\"http://www.kernel.org/pub/software/scm/git/docs/git-for-each-ref.html\" rel=\"noreferrer\"><code>git for-each-ref</code></a>;<br>  Also available <a href=\"https://git-blame.blogspot.com/\" rel=\"noreferrer\">since Git 2.7.0</a> for <a href=\"http://www.kernel.org/pub/software/scm/git/docs/git-branch.html\" rel=\"noreferrer\"><code>git branch</code></a>:</p>\n\n<h1>Basic Usage:</h1>\n\n<pre class=\"lang-shell prettyprint-override\"><code>git for-each-ref --sort=-committerdate refs/heads/\n\n# or using git branch (since version 2.7.0)\ngit branch --sort=-committerdate  # DESC\ngit branch --sort=committerdate  # ASC\n</code></pre>\n\n<h3>Result:</h3>\n\n<p><img src=\"https://i.imgur.com/AlaP8dD.png\" alt=\"result\"></p>\n\n<h1>Advanced Usage:</h1>\n\n<pre class=\"lang-shell prettyprint-override\"><code>git for-each-ref --sort=committerdate refs/heads/ --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(color:red)%(objectname:short)%(color:reset) - %(contents:subject) - %(authorname) (%(color:green)%(committerdate:relative)%(color:reset))'\n</code></pre>\n\n<h3>Result:</h3>\n\n<p><img src=\"https://i.imgur.com/tDCTiZx.png\" alt=\"result\"></p>\n",
        "source": "so",
        "questionId": 5188320
      },
      {
        "title": "Undoing git reset?",
        "body": "<h3>Short answer:</h3>\n\n<pre><code>git reset 'HEAD@{1}'\n</code></pre>\n\n<h3>Long answer:</h3>\n\n<p>Git keeps a log of all ref updates (e.g., checkout, reset, commit, merge). You can view it by typing:</p>\n\n<pre><code>git reflog\n</code></pre>\n\n<p>Somewhere in this list is the commit that you lost. Let's say you just typed <code>git reset HEAD~</code> and want to undo it. My reflog looks like this:</p>\n\n<pre><code>$ git reflog\n3f6db14 HEAD@{0}: HEAD~: updating HEAD\nd27924e HEAD@{1}: checkout: moving from d27924e0fe16776f0d0f1ee2933a0334a4787b4c\n[...]\n</code></pre>\n\n<p>The first line says that <code>HEAD</code> 0 positions ago (in other words, the current position) is 3f6db14; it was obtained by resetting to <code>HEAD~</code>. The second line says that <code>HEAD</code> 1 position ago (in other words, the state before the reset) is d27924e. It was obtained by checking out a particular commit (though that's not important right now). So, to undo the reset, run <code>git reset HEAD@{1}</code> (or <code>git reset d27924e</code>).</p>\n\n<p>If, on the other hand, you've run some other commands since then that update HEAD, the commit you want won't be at the top of the list, and you'll need to search through the <code>reflog</code>.</p>\n\n<p>One final note: It may be easier to look at the <code>reflog</code> for the specific branch you want to un-reset, say master, rather than <code>HEAD</code>:</p>\n\n<pre><code>$ git reflog show master\nc24138b master@{0}: merge origin/master: Fast-forward\n90a2bf9 master@{1}: merge origin/master: Fast-forward\n[...]\n</code></pre>\n\n<p>This should have less noise it in than the general <code>HEAD reflog</code>.</p>\n",
        "source": "so",
        "questionId": 2510276
      },
      {
        "title": "How to revert uncommitted changes including files and folders?",
        "body": "<p>You can run these two commands:</p>\n\n<pre><code># Revert changes to modified files.\ngit reset --hard\n\n# Remove all untracked files and directories. (`-f` is `force`, `-d` is `remove directories`)\ngit clean -fd\n</code></pre>\n",
        "source": "so",
        "questionId": 5807137
      },
      {
        "title": "How can I know in git if a branch has been already merged into master?",
        "body": "<p><code>git branch --merged master</code> lists branches merged into <em>master</em></p>\n\n<p><code>git branch --merged</code> lists branches merged into <em>HEAD</em> (i.e. tip of current branch)</p>\n\n<p><code>git branch --no-merged</code> lists branches that have not been merged</p>\n\n<p>By default this applies to only the local branches.  The <code>-a</code> flag will show both local and remote branches, and the <code>-r</code> flag shows only the remote branches.</p>\n",
        "source": "so",
        "questionId": 226976
      },
      {
        "title": "Git refusing to merge unrelated histories on rebase",
        "body": "<p>The default behavior has changed since git 2.9:</p>\n\n<blockquote>\n  <p>\"git merge\" used to allow merging two branches that have no common\n     base by default, which led to a brand new history of an existing\n     project created and then get pulled by an unsuspecting maintainer,\n     which allowed an unnecessary parallel history merged into the\n     existing project. The command has been taught <strong>not to allow this by\n     default</strong>, with an escape hatch <code>--allow-unrelated-histories</code> option\n     to be used in a rare event that merges histories of two projects\n     that started their lives independently.</p>\n</blockquote>\n\n<p>See the <a href=\"https://github.com/git/git/blob/master/Documentation/RelNotes/2.9.0.txt#L58-L68\" rel=\"noreferrer\">git release changelog</a> for more information.</p>\n\n<p>You can use <code>--allow-unrelated-histories</code> to force the merge to happen.</p>\n",
        "source": "so",
        "questionId": 37937984
      },
      {
        "title": "What is HEAD in Git?",
        "body": "<p>You can think of the HEAD as the \"current branch\". When you switch branches with <code>git checkout</code>, the HEAD revision changes to point to the tip of the new branch.</p>\n\n<p>You can see what HEAD points to by doing:</p>\n\n<pre><code>cat .git/HEAD\n</code></pre>\n\n<p>In my case, the output is:</p>\n\n<pre><code>$ cat .git/HEAD\nref: refs/heads/master\n</code></pre>\n\n<p>It is possible for HEAD to refer to a specific revision that is not associated with a branch name. This situation is called a <a href=\"http://git-scm.com/docs/git-checkout#_detached_head\" rel=\"noreferrer\">detached HEAD</a>.</p>\n",
        "source": "so",
        "questionId": 2304087
      },
      {
        "title": "Git: How to find a deleted file in the project commit history?",
        "body": "<p>If you do not know the exact path you may use</p>\n\n<pre><code>git log --all --full-history -- **/thefile.*\n</code></pre>\n\n<p>If you know the path the file was at, you can do this:</p>\n\n<pre><code>git log --all --full-history -- &lt;path-to-file&gt;\n</code></pre>\n\n<p>This should show a list of commits in all branches which touched that file. Then, you can find the version of the file you want, and display it with...</p>\n\n<pre><code>git show &lt;SHA&gt; -- &lt;path-to-file&gt;\n</code></pre>\n\n<p>Or restore it into your working copy with:</p>\n\n<p><code>git checkout &lt;SHA&gt;^ -- &lt;path-to-file&gt;</code></p>\n\n<p>Note the caret symbol (<code>^</code>), which gets the checkout <em>prior</em> to the one identified, because at the moment of <code>&lt;SHA&gt;</code> commit the file is deleted, we need to look at the previous commit to get the deleted file's contents</p>\n",
        "source": "so",
        "questionId": 7203515
      },
      {
        "title": "Why are there 2 ways to unstage a file in git?",
        "body": "<p><code>git rm --cached &lt;filePath&gt;</code> <strong>does not unstage</strong> a file, it actually <strong>stages the removal of the file(s)</strong> from the repo (assuming it was already committed before) but leaves the file in your working tree (leaving you with an untracked file).</p>\n\n<p><code>git reset &lt;filePath&gt;</code> will <strong>unstage</strong> any staged changes for the given file(s).</p>\n\n<p>That said, if you used <code>git rm --cached</code> on a new file that is staged, it would basically look like you had just unstaged it since it had never been committed before.</p>\n",
        "source": "so",
        "questionId": 6919121
      },
      {
        "title": "Break a previous commit into multiple commits",
        "body": "<p><a href=\"http://git-scm.com/book/en/Git-Tools-Rewriting-History\" rel=\"noreferrer\"><code>git rebase -i</code></a> will do it.</p>\n\n<p>First, start with a clean working directory: <code>git status</code> should show no pending modifications, deletions, or additions.</p>\n\n<p>To split apart your most recent commit, first:</p>\n\n<pre><code>$ git reset HEAD~\n</code></pre>\n\n<p>Now commit the pieces individually in the usual way, producing as many commits as you need.</p>\n\n<p>If it was farther back in the tree, then</p>\n\n<pre><code>$ git rebase -i HEAD~3\n</code></pre>\n\n<p>where <code>3</code> is how many commits back it is.</p>\n\n<p>If it was farther back in the tree than you want to count, then</p>\n\n<pre><code>$ git rebase -i 123abcd~\n</code></pre>\n\n<p>where <code>123abcd</code> is the SHA1 of the commit you want to split up.</p>\n\n<p>When you get the rebase edit screen, find the commit you want to break apart.  At the beginning of that line, replace <code>pick</code> with <code>edit</code> (<code>e</code> for short).  Save the buffer and exit.  Rebase will now stop just after the commit you want to edit.  Then:</p>\n\n<pre><code>$ git reset HEAD~\n</code></pre>\n\n<p>Commit the pieces individually in the usual way, producing as many commits as you need, then</p>\n\n<pre><code>$ git rebase --continue\n</code></pre>\n",
        "source": "so",
        "questionId": 6217156
      },
      {
        "title": "How do I commit case-sensitive only filename changes in Git?",
        "body": "<p>You can use <a href=\"http://git-scm.com/docs/git-mv\" rel=\"noreferrer\">git mv</a>:</p>\n\n<pre><code>git mv -f OldFileNameCase newfilenamecase\n</code></pre>\n",
        "source": "so",
        "questionId": 17683458
      },
      {
        "title": "How to create .gitignore file",
        "body": "<p>If you're using Windows it will not let you create a file without a filename in Windows Explorer. It will give you the error \"<em>You must type a file name</em>\" if you try to rename a text file as <strong>.gitignore</strong></p>\n\n<p><img src=\"https://i.imgur.com/W0J6Ort.png\" alt=\"enter image description here\"></p>\n\n<p>To get around this I used the following steps</p>\n\n<ol>\n<li>Create the text file gitignore.txt</li>\n<li>Open it in a text editor and add your rules, then save and close</li>\n<li>Hold SHIFT, right click the folder you're in, then select <strong>Open command window here</strong></li>\n<li>Then rename the file in the command line, with <code>ren gitignore.txt .gitignore</code></li>\n</ol>\n\n<p>Alternatively <a href=\"https://stackoverflow.com/users/1526257/henningcash\">@HenningCash</a> suggests in the comments</p>\n\n<blockquote>\n  <p>You can get around this Windows Explorer error by appending a dot to\n  the filename without extension: .gitignore. will be automatically\n  changed to .gitignore</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 10744305
      },
      {
        "title": "How to merge a specific commit in Git",
        "body": "<p>'<a href=\"http://www.kernel.org/pub/software/scm/git/docs/git-cherry-pick.html\" rel=\"noreferrer\"><code>git cherry-pick</code></a>' should be your answer here.</p>\n\n<blockquote>\n  <p>Apply the change introduced by an existing commit. </p>\n</blockquote>\n\n<p>Do not forget to read <a href=\"https://stackoverflow.com/users/36723/bdonlan\">bdonlan</a>'s answer about the consequence of cherry-picking in this post:<br>\n<a href=\"https://stackoverflow.com/questions/880957/pull-all-commits-from-a-branch-push-specified-commits-to-another/881014#881014\">\"Pull all commits from a branch, push specified commits to another\"</a>, where:</p>\n\n<pre><code>A-----B------C\n \\\n  \\\n   D\n</code></pre>\n\n<p>becomes:</p>\n\n<pre><code>A-----B------C\n \\\n  \\\n   D-----C'\n</code></pre>\n\n<blockquote>\n  <p>The problem with this commits is that git considers commits to include all history before them</p>\n  \n  <p>Where C' has a different <code>SHA-1</code> ID.<br>\n  Likewise, cherry picking a commit from one branch to another basically involves generating a patch, then applying it, thus losing history that way as well.</p>\n  \n  <p>This changing of commit IDs breaks git's merging functionality among other things (though if used sparingly there are heuristics that will paper over this).<br>\n  More importantly though, <strong>it ignores functional dependencies - if C actually used a function defined in B, you'll never know</strong>.</p>\n</blockquote>\n",
        "source": "so",
        "questionId": 881092
      },
      {
        "title": "Git: Create a branch from unstaged/uncommitted changes on master",
        "body": "<p>No need to stash.</p>\n\n<pre><code>git checkout -b new_branch_name\n</code></pre>\n\n<p>does not touch your local changes. It just creates the branch from the current HEAD and sets the HEAD there.\nSo I guess that's what you want.</p>\n\n<p><strong>--- Edit to explain the result of checkout master ---</strong></p>\n\n<p>Are you confused because <code>checkout master</code> does not discard your changes?</p>\n\n<p>Since the changes are only local, git does not want you to lose them too easily. Upon changing branch, git does not overwrite your local changes. The result of your <code>checkout master</code> is:</p>\n\n<pre><code>M   testing\n</code></pre>\n\n<p>, which means that your working files are not clean. git did change the HEAD, but did not overwrite your local files. That is why your last status still show your local changes, although you are on <code>master</code>.</p>\n\n<p>If you really want to discard the local changes, you have to force the checkout with <code>-f</code>.</p>\n\n<pre><code>git checkout master -f\n</code></pre>\n\n<p>Since your changes were never committed, you'd lose them.</p>\n\n<p>Try to get back to your branch, commit your changes, then checkout the master again.</p>\n\n<pre><code>git checkout new_branch\ngit commit -a -m\"edited\"\ngit checkout master\ngit status\n</code></pre>\n\n<p>You should get a <code>M</code> message after the first checkout, but then not anymore after the <code>checkout master</code>, and <code>git status</code> should show no modified files.</p>\n\n<p><strong>--- Edit to clear up confusion about working directory (local files)---</strong></p>\n\n<p>In answer to your first comment, local changes are just... well, local. Git does not save them automatically, you must tell it to save them for later.\nIf you make changes and do not explicitly commit or stash them, git will not version them. If you change HEAD (<code>checkout master</code>), the local changes are not overwritten since unsaved.</p>\n",
        "source": "so",
        "questionId": 2569459
      },
      {
        "title": "LF will be replaced by CRLF in git - What is that and is it important?",
        "body": "<p>In Unix systems the end of a line is represented with a line feed (LF). In windows a line is represented with a carriage return (CR) and a line feed (LF) thus (CRLF). when you get code from git that was uploaded from a unix system they will only have an LF.</p>\n\n<p>If you want to turn this warning off, type this in the git command line</p>\n\n<pre><code>git config core.autocrlf true\n</code></pre>\n\n<p>If you want to make an intelligent decision how git should handle this, <a href=\"http://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#Formatting-and-Whitespace\" rel=\"noreferrer\">read the documentation</a> </p>\n\n<p>Here is a snippet</p>\n\n<blockquote>\n  <p><strong>Formatting and Whitespace</strong></p>\n  \n  <p>Formatting and whitespace issues are some of the more frustrating and\n  subtle problems that many developers encounter when collaborating,\n  especially cross-platform. It’s very easy for patches or other\n  collaborated work to introduce subtle whitespace changes because\n  editors silently introduce them, and if your files ever touch a\n  Windows system, their line endings might be replaced. Git has a few\n  configuration options to help with these issues.</p>\n\n<pre><code>core.autocrlf\n</code></pre>\n  \n  <p>If you’re programming on Windows and working with people who are not\n  (or vice-versa), you’ll probably run into line-ending issues at some\n  point. This is because Windows uses both a carriage-return character\n  and a linefeed character for newlines in its files, whereas Mac and\n  Linux systems use only the linefeed character. This is a subtle but\n  incredibly annoying fact of cross-platform work; many editors on\n  Windows silently replace existing LF-style line endings with CRLF, or\n  insert both line-ending characters when the user hits the enter key.</p>\n  \n  <p>Git can handle this by auto-converting CRLF line endings into LF when\n  you add a file to the index, and vice versa when it checks out code\n  onto your filesystem. You can turn on this functionality with the\n  core.autocrlf setting. If you’re on a Windows machine, set it to true\n  – this converts LF endings into CRLF when you check out code:</p>\n\n<pre><code>$ git config --global core.autocrlf true\n</code></pre>\n  \n  <p>If you’re on a Linux or Mac system that uses LF line endings, then you\n  don’t want Git to automatically convert them when you check out files;\n  however, if a file with CRLF endings accidentally gets introduced,\n  then you may want Git to fix it. You can tell Git to convert CRLF to\n  LF on commit but not the other way around by setting core.autocrlf to\n  input:</p>\n\n<pre><code>$ git config --global core.autocrlf input\n</code></pre>\n  \n  <p>This setup should leave you with CRLF endings in Windows checkouts,\n  but LF endings on Mac and Linux systems and in the repository.</p>\n  \n  <p>If you’re a Windows programmer doing a Windows-only project, then you\n  can turn off this functionality, recording the carriage returns in the\n  repository by setting the config value to false:</p>\n\n<pre><code>$ git config --global core.autocrlf false\n</code></pre>\n</blockquote>\n",
        "source": "so",
        "questionId": 5834014
      },
      {
        "title": "How to get just one file from another branch",
        "body": "<pre><code>git checkout master               # first get back to master\ngit checkout experiment -- app.js # then copy the version of app.js \n                                  # from branch \"experiment\"\n</code></pre>\n\n<p>See also <a href=\"https://stackoverflow.com/questions/692246/git-how-to-undo-changes-of-one-file\">git how to undo changes of one file?</a></p>\n\n<p>As <a href=\"https://stackoverflow.com/users/46058/jakub-narebski\">Jakub Narębski</a> mentions in the comments:</p>\n\n<pre><code>git show experiment:path/to/app.js &gt; app.js\n</code></pre>\n\n<p>works too, except that, as detailed in the SO question \"<a href=\"https://stackoverflow.com/questions/610208/how-to-retrieve-a-single-file-from-specific-revision-in-git/610315#610315\">How to retrieve a single file from specific revision in Git?</a>\", you need to use the full path from the root directory of the repo.<br>\nHence the path/to/app.js used by Jakub in his example.</p>\n\n<p>As <a href=\"https://stackoverflow.com/users/7476/frosty\">Frosty</a> mentions in the comment:</p>\n\n<blockquote>\n  <p>you will only get the most recent state of app.js</p>\n</blockquote>\n\n<p>But, for <code>git checkout</code> or <code>git show</code>, you can actually reference any revision you want, as illustrated in the SO question \"<a href=\"https://stackoverflow.com/questions/1507300/git-checkout-revision-of-a-file-in-git-gui/1507678#1507678\">git checkout revision of a file in git gui</a>\":</p>\n\n<pre><code>$ git show $REVISION:$FILENAME\n$ git checkout $REVISION -- $FILENAME\n</code></pre>\n\n<p>would be the same is $FILENAME is a <strong>full path</strong> of a versioned file.</p>\n\n<p><code>$REVISION</code> can be as shown in <a href=\"http://www.kernel.org/pub/software/scm/git/docs/git-rev-parse.html\" rel=\"noreferrer\"><code>git rev-parse</code></a>:</p>\n\n<pre><code>experiment@{yesterday}:app.js # app.js as it was yesterday \nexperiment^:app.js            # app.js on the first commit parent\nexperiment@{2}:app.js         # app.js two commits ago\n</code></pre>\n\n<p>and so on.</p>\n",
        "source": "so",
        "questionId": 2364147
      },
      {
        "title": "Ignoring directories in Git repos on Windows",
        "body": "<p>Create a file named <code>.gitignore</code> in your project's directory. Ignore directories by entering the directory name into the file (with a slash appended):</p>\n\n<pre><code>dir_to_ignore/\n</code></pre>\n\n<p>More info <a href=\"http://git-scm.com/docs/gitignore\" rel=\"noreferrer\">here</a>.</p>\n",
        "source": "so",
        "questionId": 343646
      },
      {
        "title": "git branch naming best practices",
        "body": "<p>Here are some branch naming conventions that I use and the reasons for them</p>\n\n<p><strong>Branch naming conventions</strong></p>\n\n<ol>\n<li>Use grouping tokens (words) at the beginning of your branch names.</li>\n<li>Define and use short lead tokens to differentiate branches in a way that is meaningful to your workflow.</li>\n<li>Use slashes to separate parts of your branch names.</li>\n<li>Do not use bare numbers as leading parts.</li>\n<li>Avoid long descriptive names for long-lived branches.</li>\n</ol>\n\n<p><strong>Group tokens</strong></p>\n\n<p>Use \"grouping\" tokens in front of your branch names. </p>\n\n<pre><code>group1/foo\ngroup2/foo\ngroup1/bar\ngroup2/bar\ngroup3/bar\ngroup1/baz\n</code></pre>\n\n<p>The groups can be named whatever you like to match your workflow.  I like to use short nouns for mine.  Read on for more clarity.</p>\n\n<p><strong>Short well-defined tokens</strong></p>\n\n<p>Choose short tokens so they do not add too much noise to every one of your branch names.  I use these:</p>\n\n<pre><code>wip       Works in progress; stuff I know won't be finished soon\nfeat      Feature I'm adding or expanding\nbug       Bug fix or experiment\njunk      Throwaway branch created to experiment\n</code></pre>\n\n<p>Each of these tokens can be used to tell you to which part of your workflow each branch belongs.</p>\n\n<p>It sounds like you have multiple branches for different cycles of a change. I do not know what your cycles are, but let's assume they are 'new', 'testing' and 'verified'.  You can name your branches with abbreviated versions of these tags, always spelled the same way, to both group them and to remind you which stage you're in.</p>\n\n<pre><code>new/frabnotz\nnew/foo\nnew/bar\ntest/foo\ntest/frabnotz\nver/foo\n</code></pre>\n\n<p>You can quickly tell which branches have reached each different stage, and you can group them together easily using Git's pattern matching options.</p>\n\n<pre><code>$ git branch --list \"test/*\"\ntest/foo\ntest/frabnotz\n\n$ git branch --list \"*/foo\"\nnew/foo\ntest/foo\nver/foo\n\n$ gitk --branches=\"*/foo\"\n</code></pre>\n\n<p><strong>Use slashes to separate parts</strong></p>\n\n<p>You may use most any delimiter you like in branch names, but I find slashes to be the most flexible. You might prefer to use dashes or dots.  But slashes let you do some branch renaming when pushing or fetching to/from a remote.</p>\n\n<pre><code>$ git push origin 'refs/heads/feature/*:refs/heads/phord/feat/*'\n$ git push origin 'refs/heads/bug/*:refs/heads/review/bugfix/*'\n</code></pre>\n\n<p>For me, slashes also work better for tab expansion (command completion) in my shell.  The way I have it configured I can search for branches with different sub-parts by typing the first characters of the part and pressing the TAB key.  Zsh then gives me a list of branches which match the part of the token I have typed.  This works for preceding tokens as well as embedded ones.</p>\n\n<pre><code>$ git checkout new&lt;TAB&gt;\nMenu:  new/frabnotz   new/foo   new/bar\n\n\n$ git checkout foo&lt;TAB&gt;\nMenu:  new/foo   test/foo   ver/foo\n</code></pre>\n\n<p>(Zshell is very configurable about command completion and I could also configure it to handle dashes, underscores or dots the same way. But I choose not to.)</p>\n\n<p>It also lets you search for branches in many git commands, like this:</p>\n\n<pre><code>git branch --list \"feature/*\"\ngit log --graph --oneline --decorate --branches=\"feature/*\" \ngitk --branches=\"feature/*\" \n</code></pre>\n\n<p>Caveat: As Slipp points out in the comments, slashes can cause problems.  Because branches are implemented as paths, you cannot have a branch named \"foo\" and another branch named \"foo/bar\".  This can be confusing for new users.</p>\n\n<p><strong>Do not use bare numbers</strong></p>\n\n<p>Do not use use bare numbers (or hex numbers) as part of your branch naming scheme. Inside tab-expansion of a reference name, git may decide that a number is part of a sha-1 instead of a branch name.  For example, my issue tracker names bugs with decimal numbers.  I name my related branches CRnnnnn rather than just nnnnn to avoid confusion.  </p>\n\n<pre><code>$ git checkout CR15032&lt;TAB&gt;\nMenu:   fix/CR15032    test/CR15032\n</code></pre>\n\n<p>If I tried to expand just 15032, git would be unsure whether I wanted to search SHA-1's or branch names, and my choices would be somewhat limited.</p>\n\n<p><strong>Avoid long descriptive names</strong></p>\n\n<p>Long branch names can be very helpful when you are looking at a list of branches.  But it can get in the way when looking at decorated one-line logs as the branch names can eat up most of the single line and abbreviate the visible part of the log.</p>\n\n<p>On the other hand long branch names can be more helpful in \"merge commits\" if you do not habitually rewrite them by hand.  The default merge commit message is <code>Merge branch 'branch-name'</code>.  You may find it more helpful to have merge messages show up as <code>Merge branch 'fix/CR15032/crash-when-unformatted-disk-inserted'</code> instead of just <code>Merge branch 'fix/CR15032'</code>.</p>\n",
        "source": "so",
        "questionId": 273695
      },
      {
        "title": "Rename master branch for both local and remote Git repositories",
        "body": "<p>The closest thing to renaming is deleting and then re-creating on the remote. For example:</p>\n\n<pre class=\"lang-bash prettyprint-override\"><code>git branch -m master master-old\ngit push remote :master         # delete master\ngit push remote master-old      # create master-old on remote\n\ngit checkout -b master some-ref # create a new local master\ngit push remote master          # create master on remote\n</code></pre>\n\n<p>However this has a lot of caveats. First, no existing checkouts will know about the rename - git does <em>not</em> attempt to track branch renames. If the new <code>master</code> doesn't exist yet, git pull will error out. If the new <code>master</code> has been created. the pull will attempt to merge <code>master</code> and <code>master-old</code>. So it's generally a bad idea unless you have the cooperation of everyone who has checked out the repository previously.</p>\n\n<p>Note: Newer versions of git will not allow you to delete the master branch remotely by default. You can override this by setting the <code>receive.denyDeleteCurrent</code> configuration value to <code>warn</code> or <code>ignore</code> on the <em>remote</em> repository. Otherwise, if you're ready to create a new master right away, skip the <code>git push remote :master</code> step, and pass <code>--force</code> to the <code>git push remote master</code> step. Note that if you're not able to change the remote's configuration, you won't be able to completely delete the master branch!</p>\n\n<p>This caveat only applies to the current branch (usually the <code>master</code> branch); any other branch can be deleted and recreated as above.</p>\n",
        "source": "so",
        "questionId": 1526794
      }
    ]
  },
  {
    "Author": "git-tips",
    "url": "https://github.com/git-tips/tips",
    "format": "markdown",
    "tips": [
      {
        "title": "Everyday Git in twenty commands or so",
        "body": "```git help everyday```"
      },
      {
        "title": "Show helpful guides that come with Git",
        "body": "```git help -g```"
      },
      {
        "title": "Search change by content",
        "body": "```git log -S'<a term in the source>'```"
      },
      {
        "title": "Remove sensitive data from history, after a push",
        "body": "```git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch <path-to-your-file>' --prune-empty --tag-name-filter cat -- --all && git push origin --force --all```"
      },
      {
        "title": "Sync with remote, overwrite local changes",
        "body": "```git fetch origin && git reset --hard origin/master && git clean -f -d```"
      },
      {
        "title": "List of all files till a commit",
        "body": "```git ls-tree --name-only -r <commit-ish>```"
      },
      {
        "title": "Git reset first commit",
        "body": "```git update-ref -d HEAD```"
      },
      {
        "title": "List all the conflicted files",
        "body": "```git diff --name-only --diff-filter=U```"
      },
      {
        "title": "List of all files changed in a commit",
        "body": "```git diff-tree --no-commit-id --name-only -r <commit-ish>```"
      },
      {
        "title": "Unstaged changes since last commit",
        "body": "```git diff```"
      },
      {
        "title": "Changes staged for commit",
        "body": "```git diff --cached```"
      },
      {
        "title": "Show both staged and unstaged changes",
        "body": "```git diff HEAD```"
      },
      {
        "title": "List all branches that are already merged into master",
        "body": "```git branch --merged master```"
      },
      {
        "title": "Quickly switch to the previous branch",
        "body": "```git checkout -```"
      },
      {
        "title": "Remove branches that have already been merged with master",
        "body": "```git branch --merged master | grep -v '^\\*' | xargs -n 1 git branch -d```"
      },
      {
        "title": "List all branches and their upstreams, as well as last commit on branch",
        "body": "```git branch -vv```"
      },
      {
        "title": "Track upstream branch",
        "body": "```git branch -u origin/mybranch```"
      },
      {
        "title": "Delete local branch",
        "body": "```git branch -d <local_branchname>```"
      },
      {
        "title": "Delete remote branch",
        "body": "```git push origin --delete <remote_branchname>```"
      },
      {
        "title": "Delete local tag",
        "body": "```git tag -d <tag-name>```"
      },
      {
        "title": "Delete remote tag",
        "body": "```git push origin :refs/tags/<tag-name>```"
      },
      {
        "title": "Undo local changes with the last content in head",
        "body": "```git checkout -- <file_name>```"
      },
      {
        "title": "Revert: Undo a commit by creating a new commit",
        "body": "```git revert <commit-ish>```"
      },
      {
        "title": "Reset: Discard commits, advised for private branch",
        "body": "```git reset <commit-ish>```"
      },
      {
        "title": "Reword the previous commit message",
        "body": "```git commit -v --amend```"
      },
      {
        "title": "See commit history for just the current branch",
        "body": "```git cherry -v master```"
      },
      {
        "title": "Amend author.",
        "body": "```git commit --amend --author='Author Name <email@address.com>'```"
      },
      {
        "title": "Reset author, after author has been changed in the global config.",
        "body": "```git commit --amend --reset-author --no-edit```"
      },
      {
        "title": "Changing a remote's URL",
        "body": "```git remote set-url origin <URL>```"
      },
      {
        "title": "Get list of all remote references",
        "body": "```git remote```"
      },
      {
        "title": "Get list of all local and remote branches",
        "body": "```git branch -a```"
      },
      {
        "title": "Get only remote branches",
        "body": "```git branch -r```"
      },
      {
        "title": "Stage parts of a changed file, instead of the entire file",
        "body": "```git add -p```"
      },
      {
        "title": "Get git bash completion",
        "body": "```curl http://git.io/vfhol > ~/.git-completion.bash && echo '[ -f ~/.git-completion.bash ] && . ~/.git-completion.bash' >> ~/.bashrc```"
      },
      {
        "title": "What changed since two weeks?",
        "body": "```git log --no-merges --raw --since='2 weeks ago'```"
      },
      {
        "title": "See all commits made since forking from master",
        "body": "```git log --no-merges --stat --reverse master..```"
      },
      {
        "title": "Pick commits across branches using cherry-pick",
        "body": "```git checkout <branch-name> && git cherry-pick <commit-ish>```"
      },
      {
        "title": "Find out branches containing commit-hash",
        "body": "```git branch -a --contains <commit-ish>```"
      },
      {
        "title": "Git Aliases",
        "body": "```git config --global alias.<handle> <command> \ngit config --global alias.st status```"
      },
      {
        "title": "Saving current state of tracked files without commiting",
        "body": "```git stash```"
      },
      {
        "title": "Saving current state of unstaged changes to tracked files",
        "body": "```git stash -k```"
      },
      {
        "title": "Saving current state including untracked files",
        "body": "```git stash -u```"
      },
      {
        "title": "Saving current state with message",
        "body": "```git stash save <message>```"
      },
      {
        "title": "Saving current state of all files (ignored, untracked, and tracked)",
        "body": "```git stash -a```"
      },
      {
        "title": "Show list of all saved stashes",
        "body": "```git stash list```"
      },
      {
        "title": "Apply any stash without deleting from the stashed list",
        "body": "```git stash apply <stash@{n}>```"
      },
      {
        "title": "Apply last stashed state and delete it from stashed list",
        "body": "```git stash pop```"
      },
      {
        "title": "Delete all stored stashes",
        "body": "```git stash clear```"
      },
      {
        "title": "Grab a single file from a stash",
        "body": "```git checkout <stash@{n}> -- <file_path>```"
      },
      {
        "title": "Show all tracked files",
        "body": "```git ls-files -t```"
      },
      {
        "title": "Show all untracked files",
        "body": "```git ls-files --others```"
      },
      {
        "title": "Show all ignored files",
        "body": "```git ls-files --others -i --exclude-standard```"
      },
      {
        "title": "Create new working tree from a repository (git 2.5)",
        "body": "```git worktree add -b <branch-name> <path> <start-point>```"
      },
      {
        "title": "Create new working tree from HEAD state",
        "body": "```git worktree add --detach <path> HEAD```"
      },
      {
        "title": "Untrack files without deleting",
        "body": "```git rm --cached <file_path>```"
      },
      {
        "title": "Before deleting untracked files/directory, do a dry run to get the list of these files/directories",
        "body": "```git clean -n```"
      },
      {
        "title": "Forcefully remove untracked files",
        "body": "```git clean -f```"
      },
      {
        "title": "Forcefully remove untracked directory",
        "body": "```git clean -f -d```"
      },
      {
        "title": "Update all the submodules",
        "body": "```git submodule foreach git pull```"
      },
      {
        "title": "Show all commits in the current branch yet to be merged to master",
        "body": "```git cherry -v master```"
      },
      {
        "title": "Rename a branch",
        "body": "```git branch -m <new-branch-name>```"
      },
      {
        "title": "Rebases 'feature' to 'master' and merges it in to master ",
        "body": "```git rebase master feature && git checkout master && git merge -```"
      },
      {
        "title": "Archive the `master` branch",
        "body": "```git archive master --format=zip --output=master.zip```"
      },
      {
        "title": "Modify previous commit without modifying the commit message",
        "body": "```git add --all && git commit --amend --no-edit```"
      },
      {
        "title": "Prunes references to remote branches that have been deleted in the remote.",
        "body": "```git fetch -p```"
      },
      {
        "title": "Retrieve the commit hash of the initial revision.",
        "body": "``` git rev-list --reverse HEAD | head -1```"
      },
      {
        "title": "Visualize the version tree.",
        "body": "```git log --pretty=oneline --graph --decorate --all```"
      },
      {
        "title": "Deploying git tracked subfolder to gh-pages",
        "body": "```git subtree push --prefix subfolder_name origin gh-pages```"
      },
      {
        "title": "Adding a project to repo using subtree",
        "body": "```git subtree add --prefix=<directory_name>/<project_name> --squash git@github.com:<username>/<project_name>.git master```"
      },
      {
        "title": "Get latest changes in your repo for a linked project using subtree",
        "body": "```git subtree pull --prefix=<directory_name>/<project_name> --squash git@github.com:<username>/<project_name>.git master```"
      },
      {
        "title": "Export a branch with history to a file.",
        "body": "```git bundle create <file> <branch-name>```"
      },
      {
        "title": "Import from a bundle",
        "body": "```git clone repo.bundle <repo-dir> -b <branch-name>```"
      },
      {
        "title": "Get the name of current branch.",
        "body": "```git rev-parse --abbrev-ref HEAD```"
      },
      {
        "title": "Ignore one file on commit (e.g. Changelog).",
        "body": "```git update-index --assume-unchanged Changelog; git commit -a; git update-index --no-assume-unchanged Changelog```"
      },
      {
        "title": "Stash changes before rebasing",
        "body": "```git rebase --autostash```"
      },
      {
        "title": "Fetch pull request by ID to a local branch",
        "body": "```git fetch origin pull/<id>/head:<branch-name>```"
      },
      {
        "title": "Show the most recent tag on the current branch.",
        "body": "```git describe --tags --abbrev=0```"
      },
      {
        "title": "Show inline word diff.",
        "body": "```git diff --word-diff```"
      },
      {
        "title": "Show changes using common diff tools.",
        "body": "```git difftool [-t <tool>] <commit1> <commit2> <path>```"
      },
      {
        "title": "Don’t consider changes for tracked file.",
        "body": "```git update-index --assume-unchanged <file_name>```"
      },
      {
        "title": "Undo assume-unchanged.",
        "body": "```git update-index --no-assume-unchanged <file_name>```"
      },
      {
        "title": "Clean the files from `.gitignore`.",
        "body": "```git clean -X -f```"
      },
      {
        "title": "Restore deleted file.",
        "body": "```git checkout <deleting_commit>^ -- <file_path>```"
      },
      {
        "title": "Restore file to a specific commit-hash",
        "body": "```git checkout <commit-ish> -- <file_path>```"
      },
      {
        "title": "Always rebase instead of merge on pull.",
        "body": "```git config --global pull.rebase true```"
      },
      {
        "title": "List all the alias and configs.",
        "body": "```git config --list```"
      },
      {
        "title": "Make git case sensitive.",
        "body": "```git config --global core.ignorecase false```"
      },
      {
        "title": "Add custom editors.",
        "body": "```git config --global core.editor '$EDITOR'```"
      },
      {
        "title": "Auto correct typos.",
        "body": "```git config --global help.autocorrect 1```"
      },
      {
        "title": "Check if the change was a part of a release.",
        "body": "```git name-rev --name-only <SHA-1>```"
      },
      {
        "title": "Dry run. (any command that supports dry-run flag should do.)",
        "body": "```git clean -fd --dry-run```"
      },
      {
        "title": "Marks your commit as a fix of a previous commit.",
        "body": "```git commit --fixup <SHA-1>```"
      },
      {
        "title": "Squash fixup commits normal commits.",
        "body": "```git rebase -i --autosquash```"
      },
      {
        "title": "Skip staging area during commit.",
        "body": "```git commit --only <file_path>```"
      },
      {
        "title": "Interactive staging.",
        "body": "```git add -i```"
      },
      {
        "title": "List ignored files.",
        "body": "```git check-ignore *```"
      },
      {
        "title": "Status of ignored files.",
        "body": "```git status --ignored```"
      },
      {
        "title": "Commits in Branch1 that are not in Branch2",
        "body": "```git log Branch1 ^Branch2```"
      },
      {
        "title": "List n last commits",
        "body": "```git log -<n>```"
      },
      {
        "title": "Reuse recorded resolution, record and reuse previous conflicts resolutions.",
        "body": "```git config --global rerere.enabled 1```"
      },
      {
        "title": "Open all conflicted files in an editor.",
        "body": "```git diff --name-only | uniq | xargs $EDITOR```"
      },
      {
        "title": "Count unpacked number of objects and their disk consumption.",
        "body": "```git count-objects --human-readable```"
      },
      {
        "title": "Prune all unreachable objects from the object database.",
        "body": "```git gc --prune=now --aggressive```"
      },
      {
        "title": "Instantly browse your working repository in gitweb.",
        "body": "```git instaweb [--local] [--httpd=<httpd>] [--port=<port>] [--browser=<browser>]```"
      },
      {
        "title": "View the GPG signatures in the commit log",
        "body": "```git log --show-signature```"
      },
      {
        "title": "Remove entry in the global config.",
        "body": "```git config --global --unset <entry-name>```"
      },
      {
        "title": "Checkout a new branch without any history",
        "body": "```git checkout --orphan <branch_name>```"
      },
      {
        "title": "Extract file from another branch.",
        "body": "```git show <branch_name>:<file_name>```"
      },
      {
        "title": "List only the root and merge commits.",
        "body": "```git log --first-parent```"
      },
      {
        "title": "Change previous two commits with an interactive rebase.",
        "body": "```git rebase --interactive HEAD~2```"
      },
      {
        "title": "List all branch is WIP",
        "body": "```git checkout master && git branch --no-merged```"
      },
      {
        "title": "Find guilty with binary search",
        "body": "```git bisect start                    # Search start \ngit bisect bad                      # Set point to bad commit \ngit bisect good v2.6.13-rc2         # Set point to good commit|tag \ngit bisect bad                      # Say current state is bad \ngit bisect good                     # Say current state is good \ngit bisect reset                    # Finish search \n```"
      },
      {
        "title": "Bypass pre-commit and commit-msg githooks",
        "body": "```git commit --no-verify```"
      },
      {
        "title": "List commits and changes to a specific file (even through renaming)",
        "body": "```git log --follow -p -- <file_path>```"
      },
      {
        "title": "Clone a single branch",
        "body": "```git clone -b <branch-name> --single-branch https://github.com/user/repo.git```"
      },
      {
        "title": "Create and switch new branch",
        "body": "```git checkout -b <branch-name>```"
      },
      {
        "title": "Ignore file mode changes on commits",
        "body": "```git config core.fileMode false```"
      },
      {
        "title": "Turn off git colored terminal output",
        "body": "```git config --global color.ui false```"
      },
      {
        "title": "Specific color settings",
        "body": "```git config --global <specific command e.g branch, diff> <true, false or always>```"
      },
      {
        "title": "Show all local branches ordered by recent commits",
        "body": "```git for-each-ref --sort=-committerdate --format='%(refname:short)' refs/heads/```"
      },
      {
        "title": "Find lines matching the pattern (regex or string) in tracked files",
        "body": "```git grep --heading --line-number 'foo bar'```"
      },
      {
        "title": "Clone a shallow copy of a repository",
        "body": "```git clone https://github.com/user/repo.git --depth 1```"
      },
      {
        "title": "Search Commit log across all branches for given text",
        "body": "```git log --all --grep='<given-text>'```"
      },
      {
        "title": "Get first commit in a branch (from master)",
        "body": "```git log master..<branch-name> --oneline | tail -1```"
      },
      {
        "title": "Unstaging Staged file",
        "body": "```git reset HEAD <file-name>```"
      },
      {
        "title": "Force push to Remote Repository",
        "body": "```git push -f <remote-name> <branch-name>```"
      },
      {
        "title": "Adding Remote name",
        "body": "```git remote add <remote-nickname> <remote-url>```"
      },
      {
        "title": "Show the author, time and last revision made to each line of a given file",
        "body": "```git blame <file-name>```"
      },
      {
        "title": "Group commits by authors and title",
        "body": "```git shortlog```"
      },
      {
        "title": "Forced push but still ensure you don't overwrite other's work",
        "body": "```git push --force-with-lease <remote-name> <branch-name>```"
      },
      {
        "title": "Show how many lines does an author contribute",
        "body": "```git log --author='_Your_Name_Here_' --pretty=tformat: --numstat | gawk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf \"added lines: %s removed lines: %s total lines: %s\n\", add, subs, loc }' -```"
      },
      {
        "title": "Revert: Reverting an entire merge",
        "body": "```git revert -m 1 <commit-ish>```"
      },
      {
        "title": "Number of commits in a branch",
        "body": "```git rev-list --count <branch-name>```"
      },
      {
        "title": "Alias: git undo",
        "body": "```git config --global alias.undo '!f() { git reset --hard $(git rev-parse --abbrev-ref HEAD)@{${1-1}}; }; f'```"
      },
      {
        "title": "Add object notes",
        "body": "```git notes add -m 'Note on the previous commit....'```"
      },
      {
        "title": "Show all the git-notes",
        "body": "```git log --show-notes='*'```"
      },
      {
        "title": "Apply commit from another repository",
        "body": "```git --git-dir=<source-dir>/.git format-patch -k -1 --stdout <SHA1> | git am -3 -k```"
      },
      {
        "title": "Specific fetch reference",
        "body": "```git fetch origin master:refs/remotes/origin/mymaster```"
      },
      {
        "title": "Find common ancestor of two branches",
        "body": "```diff -u <(git rev-list --first-parent BranchA) <(git rev-list --first-parent BranchB) | sed -ne 's/^ //p' | head -1```"
      },
      {
        "title": "List unpushed git commits",
        "body": "```git log --branches --not --remotes```"
      },
      {
        "title": "Add everything, but whitespace changes",
        "body": "```git diff --ignore-all-space | git apply --cached```"
      },
      {
        "title": "Edit [local/global] git config",
        "body": "```git config [--global] --edit```"
      },
      {
        "title": "blame on certain range",
        "body": "```git blame -L <start>,<end>```"
      },
      {
        "title": "Show a Git logical variable.",
        "body": "```git var -l | <variable>```"
      },
      {
        "title": "Preformatted patch file.",
        "body": "```git format-patch -M upstream..topic```"
      },
      {
        "title": "Get the repo name.",
        "body": "```git rev-parse --show-toplevel```"
      },
      {
        "title": "logs between date range",
        "body": "```git log --since='FEB 1 2017' --until='FEB 14 2017'```"
      },
      {
        "title": "Exclude author from logs",
        "body": "```git log --perl-regexp --author='^((?!excluded-author-regex).*)$'```"
      },
      {
        "title": "Generates a summary of pending changes",
        "body": "```git request-pull v1.0 https://git.ko.xz/project master:for-linus```"
      },
      {
        "title": "List references in a remote repository",
        "body": "```git ls-remote git://git.kernel.org/pub/scm/git/git.git```"
      },
      {
        "title": "Backup untracked files.",
        "body": "```git ls-files --others -i --exclude-standard | xargs zip untracked.zip```"
      },
      {
        "title": "List all git aliases",
        "body": "```git config -l | grep alias | sed 's/^alias\\.//g'```"
      },
      {
        "title": "Show git status short",
        "body": "```git status --short --branch```"
      },
      {
        "title": "Checkout a commit prior to a day ago",
        "body": "```git checkout master@{yesterday}```"
      },
      {
        "title": "Push a new local branch to remote repository and track",
        "body": "```git push -u origin <branch_name>```"
      },
      {
        "title": "Change a branch base",
        "body": "```git rebase --onto <new_base> <old_base>```"
      }
    ]
  }
]