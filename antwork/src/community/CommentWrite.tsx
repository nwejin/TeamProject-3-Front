function CommentWrite() {
  return (
    <div className="commentWriteBox">
      <div className="commentWriteInnerBox">
        <div className="userProfile">
          <span>
            <a href="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/ko/thumb/a/ae/Chelsea_FC_Logo.svg/1200px-Chelsea_FC_Logo.svg.png"
                alt=""
              />
              <p>
                작성자<span> 님의 댓글</span>
              </p>
            </a>
          </span>
          <button>입력하기</button>
        </div>

        <textarea
          name=""
          id=""
          placeholder="상대방 비방 및 욕설과 같은 댓글은 검토 후 삭제 될 수 있습니다."
          cols={20}
          rows={7}
        ></textarea>
      </div>
    </div>
  );
}

export default CommentWrite;
