# js 加密

### 1. 安装 npm install jsencrypt --save

### 2. 生成密钥: [http://web.chacuo.net/netrsakeypair](http://web.chacuo.net/netrsakeypair)

```js
import JSEncrypt from "jsencrypt";

const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEgvX0TAfhMTj0xYLBLFS7E19/\n" +
  "O9LcJIQmOq80sAr6Q2MXnKNbC2lrvz91zG0eG5IiIJwoZq28rQ5wfd2SbJZlDMFe\n" +
  "hkCywQ9tqwLOqe4AcmtAGJoBQNtVrQjHIMESeBBv3Y8Rg+KB58Q9TFHVEc7JcZgp\n" +
  "o2QH8RZq+rvlS8KR4QIDAQAB";

const privateKey =
  "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMSC9fRMB+ExOPTF\n" +
  "gsEsVLsTX3870twkhCY6rzSwCvpDYxeco1sLaWu/P3XMbR4bkiIgnChmrbytDnB9\n" +
  "3ZJslmUMwV6GQLLBD22rAs6p7gBya0AYmgFA21WtCMcgwRJ4EG/djxGD4oHnxD1M\n" +
  "UdURzslxmCmjZAfxFmr6u+VLwpHhAgMBAAECgYBywsxiU/iSEY3inGoE6B+/dMvj\n" +
  "YQt+VrD6JnFlgp2Wk74N7wMTS3HQY8rqv2zGFXHdDlBD49r4gdQZ69d3CIU3DK7P\n" +
  "gQdX/Qs16FRklrNdegepu44XeChZYLGicMBcO92b0t+ngV1vs2Vm6C/g8uEYGSKy\n" +
  "tDezhw4V/Coca/26sQJBAPleeVqmSZOVUg7wjwMDUfkMuYgZGna42Wj6QE6IwiQz\n" +
  "MtWa5cK2f5xqRz973CTTdD6SVZYvbbg/OSmGDvERvW0CQQDJvKu90H1Vxo3pJp+M\n" +
  "be84C6xXXnsZMojw2R9Zh2AXcFH723XCWzD02e+JuvZOKbMbvY6aOqu92YkQaXo/\n" +
  "u+HFAkEA9fuKS7AybeFio5gKClfRGZHCxgy1PR1UYKhSnOVsVJcocuqr8CljseBo\n" +
  "TagZXT40sbBZup8oZRIAigRSYtwz9QJBAI8pYQc26XrxiMuoKRlS+qxfPFJULi9X\n" +
  "eW7R5jl2pG59uvBscUkXxco8zoyDLT+SwBQzlPtGH5J+yZHoCGUqQ7ECQGorIACm\n" +
  "niiTtMPnykw9liVEv5E56ElEyZ45q+BmkLgMQSHK6fEocjUdCrl2fzidUQlmDBof\n" +
  "aYKLwpUVPG0Vm6U=";

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey);
  return encryptor.decrypt(txt);
}
```
