
;; nft-minting
;; <contract for minting the information of the equity inside the house>

;; constants
;; Failed to mint error
(define-constant Failed-to-mint-error (err u1) )

;; data maps and vars
;; Mapping data for the property details 
(define-map prop-data 
    ;; ERR: Public Data, as all maps are public
    {token-id: uint}
    {data-hash: (buff 32), token-uri: (string-ascii 64), price: uint}
)

;; defining non-fungible token for Amortize
(define-non-fungible-token amortize-nft uint)

;; setting token-id of the NFT
(define-data-var curr-token-id uint u1)

;; private functions
;; Registering the token
(define-private (register-token (new-owner principal) (token-id uint))
    (begin
      (unwrap! (nft-mint? amortize-nft token-id new-owner) false)
    )
)

;;Check Owner
(define-private (is-owner (actor principal) (token-id uint))
  (is-eq actor
    (unwrap! (nft-get-owner? amortize-nft token-id) false)
  )
)


;; public functions
;; minting the nft on blockchain
(define-public (mint 
(owner principal)
  (data-hash (buff 32))
  (token-uri (string-ascii 64))
  (price uint)
) 
    (let
        (
            (token-id (+ (var-get curr-token-id) u1))
        )
    
        (asserts! (register-token owner token-id) Failed-to-mint-error)
          (map-set prop-data
            {token-id: token-id}
            {data-hash: data-hash, token-uri: token-uri, price: price}
          )
        (var-set curr-token-id token-id)
        (ok true)

    )
)

;; Fetching price
(define-read-only (get-price (token-id uint))
    (map-get? prop-data { token-id: token-id })
)

;; Fetch Data-hash
(define-read-only (get-data-hash (token-id uint))
    (unwrap-panic (get data-hash (map-get? prop-data {token-id: token-id})))
)

;; Fetch Token-uri
(define-read-only (get-token-urii (token-id uint))
    (unwrap-panic (get token-uri (map-get? prop-data {token-id: token-id})))
)