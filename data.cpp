

typedef struct stImageData
{
	int cVerifyCode; //数据魔术字 0xBABABABA
	int type;     //  数据类型 0x0 图片
	int nSn; //分片号
	int nSsn; //子分片号
	int nfed;//  结束标识 0  1结束
	char *dData; //数据
}IMAGEDATA;

JSON 格式
{"cVerifyCode" : 0xBABABABA, "type" : 0, "nSn" : 10, "nSsn" : 0, "nfed" : 1, "dData" : String}