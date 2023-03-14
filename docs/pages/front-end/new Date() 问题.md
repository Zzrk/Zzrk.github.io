# new Date() 问题
场景：后端要求传时间字段（Java LocalDateTime 类型）,前端可以直接使用 new Date() 得到一致的格式，但是发现发现请求时少了 8 个小时。
解决：
const getTime = (time = new Date()) => {
  return new Date(time.getTime() - time.getTimezoneOffset() * 60000);
};

