

class ApiError{
    constructor(status, messeg){
       this.status = status
       this.messeg = messeg
    }

    static badRequest(messeg){
        return new ApiError(404, messeg)
     }
    static internal(messeg){
       return new ApiError(500, messeg)
    }
    static forbiben(messeg){
      return new ApiError(404, messeg)
    }

}

module.exports = ApiError