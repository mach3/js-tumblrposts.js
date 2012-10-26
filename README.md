# TumblrPosts.js

Tumblrのタグ一覧および投稿一覧を取得する為のライブラリです。

## 機能

- TumblrのAPIを連続的に読み込んで完了後、インスタンスのメソッドで各情報を取得します。
- getTags() でカウント付きのタグ一覧を取得します。
- getPosts() で投稿一覧を取得します。

## 使い方

依存ライブラリはjQueryのみです。（1.7+）

```js

// インスタンスを生成
var myTumblrPosts = new TumblrPosts();


// 読み込み完了時のイベントハンドラを設定
myTumblrPosts.on("complete", function(){
	var $ul, tags;

	// getTags() : タグリストを取得
	tags = this.getTags();
	$ul = $("<ul>");

	$.each(tags, function(i, tag){
		$ul.append(
			$("<li>").text(tag.name + " (" + tag.count + ")")
		);
	});

	$ul.appendTo( $("#your-own-container") );
});

// 読み込みを開始
myTumblrPosts.run();

```

## メソッド

### on/off/trigger()

jQuery.fn.on/off/trigger()へのエイリアスです。
一応bind/unbind() へのエイリアスも残してあります。

### config([option])

オプションを設定/あるいは取得します。

- (Object) option : 設定するオプション

```js
myTumblrPosts.config({
	domain : "www.example.com", // 対象のTumblrのドメイン
	maxNum : 80 // 読み込む投稿の最大値
});

myTumblrPosts.config("domain"); // => "www.example.com"
myTumblrPosts.config(); // => { domain : "www.example.com", maxNum : 80 }

```

### getTags([order])

タグリストを配列で返します。
配列の内容は、{ name : "photo", count : 10 } のようなオブジェクトです。

- (String) order : countによる昇順・降順の並び替えを行います。 "desc" または "asc"。

```js
var tags = myTumblrPosts.getTags("desc");
```

### getPosts([offset], [count])

投稿リストを配列で返します。配列の内容は、Tumblr APIに準拠します。

- (Integer) offset : 取得開始インデックス
- (Integer) count : 取得投稿数

### getTitleByPost(post)

Tumblr APIのpostオブジェクトからタイトルを取得しようとがんばります。
出来なかった場合は空白を返します。

```js
$.each(myTumblrPosts.getPosts(), function(i, post){
	var title = myTumblrPosts.getTitleByPost(post);
});
```


## 作者

mach3ss

- [twitter](http://twitter.com/mach3ss)
- [blog](http://blog.mach3.jp)
- [website](http://www.mach3.jp)


